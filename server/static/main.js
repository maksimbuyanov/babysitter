const tg = window.Telegram.WebApp

const form = document.querySelector('form')

tg.onEvent('mainButtonClicked', function () {
  const login = form.elements.login.value
  const password = form.elements.password.value
  const queryId = tg.initDataUnsafe?.query_id
  const data = JSON.stringify({ login, password, queryId })
  tg.sendData(data)
})
