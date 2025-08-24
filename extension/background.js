chrome.runtime.onInstalled.addListener(() => {
    console.log("Sentinel extension installed")
})

function getDomainName(url) {
    try {
        const urlObj = new URL(url)
        let hostname = urlObj.hostname.replace(/^www\./, '')
        const parts = hostname.split('.')
        if (parts.length >= 2) {
            const domain = parts[parts.length - 2]
            return domain.charAt(0).toUpperCase() + domain.slice(1)
        }
        return hostname
    } catch (_) {
        return url
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message || !message.type) return

    if (message.type === 'SYNC_CREDENTIALS_REQUEST') {
        return
    }

    if (message.type === 'GET_CREDENTIALS_FOR_ORIGIN') {
        const origin = message.origin
        chrome.storage.local.get(['sentinel_credentials'], (result) => {
            const allCredentials = result.sentinel_credentials || []
            let matches = []
            try {
                const originUrl = new URL(origin)
                const originHost = originUrl.hostname.replace(/^www\./, '')
                matches = allCredentials.filter((cred) => {
                    if (!cred || !cred.site) return false
                    try {
                        const siteHost = new URL(cred.site).hostname.replace(/^www\./, '')
                        return siteHost === originHost || siteHost.endsWith('.' + originHost) || originHost.endsWith('.' + siteHost)
                    } catch (_) {
                        return false
                    }
                })
            } catch (_) {
                matches = []
            }
            sendResponse({ ok: true, credentials: matches })
        })
        return true
    }

    if (message.type === 'SYNC_CREDENTIALS') {
        const credentials = Array.isArray(message.credentials) ? message.credentials : []
        chrome.storage.local.set({ sentinel_credentials: credentials }, () => {
            sendResponse({ ok: true })
        })
        return true
    }

    if (message.type === 'SAVE_CREDENTIAL') {
        const cred = message.credential || {}
        if (!cred || !cred.site) {
            sendResponse({ ok: false, error: 'invalid_credential' })
            return true
        }
        chrome.storage.local.get(['sentinel_backend_url', 'sentinel_default_category'], async (result) => {
            const backendUrl = result.sentinel_backend_url || 'https://sentinel-server.vercel.app'
            const category = result.sentinel_default_category || 'Important'
            const payload = {
                site: cred.site,
                username: cred.username || '',
                password: cred.password || '',
                name: cred.name || getDomainName(cred.site),
                platform: 'Logins',
                category,
                notes: cred.notes || ''
            }
            try {
                const res = await fetch(backendUrl + '/credentials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    credentials: 'include'
                })
                const data = await res.json().catch(() => ({}))
                if (res.ok && data && data.success) {
                    sendResponse({ ok: true, saved: true })
                } else {
                    sendResponse({ ok: false, error: data?.message || 'save_failed' })
                }
            } catch (e) {
                sendResponse({ ok: false, error: 'network_error' })
            }
        })
        return true
    }
})