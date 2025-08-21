chrome.runtime.onInstalled.addListener(() => {
    console.log("Sentinel extension installed")
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message || !message.type) return

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
})