;(function () {
  const BUTTON_ID = '__sentinel_fill_btn__'

  function createFillButton(label) {
    const btn = document.createElement('button')
    btn.id = BUTTON_ID
    btn.type = 'button'
    btn.textContent = label || 'Fill from Sentinel'
    btn.style.position = 'absolute'
    btn.style.zIndex = '2147483647'
    btn.style.padding = '6px 10px'
    btn.style.fontSize = '12px'
    btn.style.borderRadius = '6px'
    btn.style.border = '1px solid rgba(0,0,0,0.15)'
    btn.style.background = '#111827'
    btn.style.color = '#fff'
    btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)'
    btn.style.cursor = 'pointer'
    return btn
  }

  function positionButton(btn, input) {
    const rect = input.getBoundingClientRect()
    btn.style.top = `${window.scrollY + rect.top - 36}px`
    btn.style.left = `${window.scrollX + rect.right - btn.offsetWidth}px`
  }

  function getOrigin() {
    return location.origin
  }

  async function requestCredentialsForOrigin() {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage(
          { type: 'GET_CREDENTIALS_FOR_ORIGIN', origin: getOrigin() },
          (response) => {
            if (response && response.ok) resolve(response.credentials || [])
            else resolve([])
          }
        )
      } catch (_) {
        resolve([])
      }
    })
  }

  function getFieldRole(input) {
    const name = `${input.name || ''}`.toLowerCase()
    const id = `${input.id || ''}`.toLowerCase()
    const placeholder = `${input.placeholder || ''}`.toLowerCase()
    if (input.type === 'password') return 'password'
    const usernameHints = /user|email|login|mail|id|account/
    if (input.type === 'email') return 'username'
    if (input.type === 'text' && (usernameHints.test(name) || usernameHints.test(id) || usernameHints.test(placeholder))) return 'username'
    return null
  }

  function findUsernameFieldNear(el) {
    const isLikelyUsername = (inp) => {
      if (!(inp instanceof HTMLInputElement)) return false
      const role = getFieldRole(inp)
      return role === 'username'
    }
    const form = el.form
    if (form) {
      const email = form.querySelector('input[type="email"]')
      if (email) return email
      const texts = Array.from(form.querySelectorAll('input[type="text"],input:not([type])'))
      const match = texts.find(isLikelyUsername)
      if (match) return match
    }
    const email = document.querySelector('input[type="email"]')
    if (email) return email
    const texts = Array.from(document.querySelectorAll('input[type="text"],input:not([type])'))
    return texts.find(isLikelyUsername) || null
  }

  function findPasswordFieldNear(el) {
    const form = el.form
    if (form) {
      const pwd = form.querySelector('input[type="password"]')
      if (pwd) return pwd
    }
    return document.querySelector('input[type="password"]')
  }

  function setInputValue(input, value) {
    try {
      const descriptor = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
      if (descriptor && descriptor.set) {
        descriptor.set.call(input, value)
      } else {
        input.value = value
      }
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.dispatchEvent(new Event('change', { bubbles: true }))
    } catch (_) {
      try {
        input.value = value
        input.dispatchEvent(new Event('input', { bubbles: true }))
        input.dispatchEvent(new Event('change', { bubbles: true }))
      } catch (_) {}
    }
  }

  async function maybeAttachFill(targetInput) {
    const existing = document.getElementById(BUTTON_ID)
    if (existing) existing.remove()

    const creds = await requestCredentialsForOrigin()
    if (!creds || creds.length === 0) return

    const btn = createFillButton(creds.length === 1 ? 'Fill credentials' : `Choose (${creds.length})`)
    document.body.appendChild(btn)
    positionButton(btn, targetInput)

    const usernameInput = getFieldRole(targetInput) === 'username' ? targetInput : findUsernameFieldNear(targetInput)
    const passwordInput = getFieldRole(targetInput) === 'password' ? targetInput : findPasswordFieldNear(targetInput)

    const removeButton = () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
      window.removeEventListener('resize', onResize)
      document.removeEventListener('focusin', onFocusIn)
      try { btn.remove() } catch (_) {}
    }

    const onScroll = () => positionButton(btn, targetInput)
    const onResize = () => positionButton(btn, targetInput)
    const onFocusIn = (e) => {
      const t = e.target
      if (!(t instanceof HTMLInputElement)) return
      if (t !== targetInput) {
        removeButton()
        maybeAttachFill(t)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('focusin', onFocusIn)

    btn.addEventListener('mousedown', (e) => e.preventDefault())

    btn.addEventListener('click', async () => {
      let selected = creds[0]
      if (creds.length > 1) {
        const options = creds
          .map((c, i) => `${i + 1}. ${c.username || c.name || c.site}`)
          .join('\n')
        const choice = prompt(`Choose credential to fill:\n${options}`)
        const idx = Math.max(1, parseInt(choice, 10)) - 1
        if (!Number.isNaN(idx) && idx >= 0 && idx < creds.length) selected = creds[idx]
      }
      try {
        if (usernameInput && selected.username != null) {
          usernameInput.focus()
          setInputValue(usernameInput, selected.username)
        }
        if (passwordInput) {
          passwordInput.focus()
          setInputValue(passwordInput, selected.password || '')
        }
      } catch (_) {}
      removeButton()
    })
  }

  function init() {
    const handler = (e) => {
      const input = e.target
      if (!(input instanceof HTMLInputElement)) return
      const role = getFieldRole(input)
      if (!role) return
      maybeAttachFill(input)
    }
    document.addEventListener('focusin', handler)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()