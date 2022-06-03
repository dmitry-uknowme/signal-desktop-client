/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react'
import Button from '../components/base/Button'
import Modal from '../components/Modal'
import StateTable from '../components/StateTable'

const SettingsPage = () => {
  const changeSettingsByKey = window.api.changeSettingsByKey
  const savedSettingsRef = useRef(null)
  // const [settings, setSettings] = useState({})
  const [settings, setSettings] = useState({
    API_URL: '127.0.0.1:81',
    POLYGON_NAME: 'ООО "Спецэкотранс"',
    POLYGON_ID:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  })
  const [modal, setModal] = useState({
    isVisible: false,
    headerText: '',
    bodyText: ''
  })

  const checkServerConnection = () => {
    setModal((state) => ({
      ...state,
      isVisible: true,
      headerText: 'Проверка соединения с сервером'
    }))
    setTimeout(
      () =>
        setModal((state) => ({
          ...state,
          body: (
            <StateTable
              distanceToNow="aaaa"
              isRefreshing={false}
              isNotShowDate={true}
              data={[
                {
                  name: 'Связь с сервером',
                  status: 'online'
                },
                {
                  name: 'Шлагбаум №1',
                  status: 'online'
                },
                {
                  name: 'Шлагбаум №2',
                  status: 'online'
                },
                {
                  name: 'Камера №1',
                  status: 'online'
                },
                {
                  name: 'Камера №2',
                  status: 'online'
                },
                {
                  name: 'Весовой терминал',
                  status: 'online'
                },
                {
                  name: 'RFID',
                  status: 'error'
                }
              ]}
            />
          )

          // bodyText:
          //   'Соединение с сервером на полигоне ОК\n Соединение с центральным сервером ОК\n Соединение с весовым терминалом ОК',
        })),
      500
    )
    setTimeout(() => setModal((state) => ({ ...state, isVisible: false })), 5000)
  }

  const saveSettings = () => {
    changeSettingsByKey('API_URL', settings.API_URL)
    changeSettingsByKey('POLYGON_NAME', settings.POLYGON_NAME)
    changeSettingsByKey('POLYGON_ID', settings.POLYGON_ID)
    // window.location.reload()
    // localStorage.setItem('settings', JSON.stringify(settings))
  }

  useEffect(() => {
    // console.log('gettting', window.api.getSettings())
    const savedSettings = window.api.getSettings()
    setSettings(savedSettings)
    // savedSettingsRef.current = localStorage.getItem('settings')
    //   ? JSON.parse(localStorage.getItem('settings'))
    //   : null
    // if (savedSettingsRef?.current) {
    //   setSettings(savedSettingsRef.current)
    // }
  }, [])

  // console.log('se')

  // useEffect(() => {
  //   saveSettings()
  // }, [settings])

  return (
    <div className="row h-100">
      <Modal {...modal} />
      <div className="col-md-12 h-100">
        <div className="row h-100">
          <div className="col-md-12 h-100">
            <div className="settings h-100">
              <div className="row">
                <div className="col-xl-9 col-md-9">
                  <h2 className="state__title">Настройки приложения</h2>
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col-md-3">Адрес сервера</div>
                <div className="col-md-4">
                  <input
                    className="w-100"
                    placeholder={settings.API_URL}
                    value={settings.API_URL}
                    style={{ color: 'black', textAlign: 'center' }}
                    onChange={(e) =>
                      setSettings((state) => ({
                        ...state,
                        API_URL: e.target.value
                      }))
                    }
                  />
                </div>
                <div className="col-md-3">
                  <Button
                    label="Проверить соединение"
                    variant="check"
                    className="w-100"
                    onClick={() => {
                      checkServerConnection()
                    }}
                  />
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col-md-3">Название полигона</div>
                <div className="col-md-7">
                  <input
                    className="w-100"
                    placeholder={settings.POLYGON_NAME}
                    value={settings.POLYGON_NAME}
                    style={{ color: 'black', textAlign: 'center' }}
                    onChange={(e) =>
                      setSettings((state) => ({
                        ...state,
                        POLYGON_NAME: e.target.value
                      }))
                    }
                  />
                </div>
                {/* <div className="col-md-3">
                  <Button
                    label="Проверить соединение"
                    variant="check"
                    className="w-100"
                  />
                </div> */}
              </div>
              <div className="row mt-5">
                <div className="col-md-3">ID клиента</div>
                <div className="col-md-7">
                  <textarea
                    className="settings__client-id w-100"
                    rows="5"
                    value={settings.POLYGON_ID}
                    onChange={(e) =>
                      setSettings((state) => ({
                        ...state,
                        POLYGON_ID: e.target.value
                      }))
                    }
                    style={{ color: 'black' }}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-3 offset-md-3">
                  <Button
                    label="Сохранить всё"
                    variant="success"
                    className="panel__btn"
                    onClick={() => saveSettings()}
                  />
                </div>
                <div className="col-md-3 offset-md-1">
                  <Button
                    label="Настройки по умолчанию"
                    variant="danger"
                    className="panel__btn"
                    onClick={
                      () => {
                        ;() => changeSettingsByKey('API_URL', process.env.API_URL)
                        ;() => changeSettingsByKey('POLYGON_NAME', process.env.POLYGON_NAME)
                        ;() => changeSettingsByKey('POLYGON_ID', process.env.POLYGON_ID)
                        // window.location.reload()
                      }
                      // setSettings({
                      //   serverURL: (process.env.API_URL as string)?.split('/')[2],
                      //   polygonName: process.env.POLYGON_NAME,
                      //   clientId: process.env.CLIENT_ID
                      // })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
