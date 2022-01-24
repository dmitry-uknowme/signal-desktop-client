import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../base/Button'
import SwitchBox from '../base/Switch'
import {
  setIsModalEnterOpened,
  setIsModalExitOpened,
} from '../../store/reducers/modalReducer'

import useActions from '../../hooks/useActions'
import { GatesIds, IGateModes } from '../../store/types/gate'

const Panel = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const { fetchGateStatus, openGate, closeGate, switchGateMode } = useActions()
  const gateStore = useSelector(store => store.gate)
  const isManualMode = useSelector(store => store.gate.mode === 'MODE_MANUAL')

  // const gateError = useSelector(store =>
  //   store.gate?.mode?.error ? store.gate?.mode?.message : null
  // )
  const isInputGateOpened = useSelector(
    store => store.gate.inputGateStatus === 'UNLOCKED'
  )

  const isOutputGateOpened = useSelector(
    store => store.gate.outputGateStatus === 'UNLOCKED'
  )

  // const gateMode = useSelector(store => store.gate.mode)
  // console.log('statetetet', isInputGateOpened)
  const openModalEnter = () => {
    dispatch(
      setIsModalEnterOpened({
        weight: (Math.random() * (1000 - 500) + 500).toFixed(0),
      })
    )
  }

  const openModalExit = () => {
    dispatch(
      setIsModalExitOpened({
        weight: (Math.random() * (200 - 100) + 100).toFixed(0),
      })
    )
  }
  console.log('gateerr', gateStore)
  // console.log('stat', manualModeError)
  // console.log('gate from ser', gate, gate.inputGateStatus)

  // const gateHandler = () => {
  //   if (isInputGateOpened) {

  //   }
  // }

  // useEffect(() => {
  //   if
  // }, [gateStore.mode])

  useEffect(() => {
    if (gateStore?.mode?.error) {
      setError(gateStore.mode?.message)
    }
    if (gateStore.inputGateStatus?.error) {
      setError(gateStore.inputGateStatus?.message)
    }
    if (gateStore?.outputGateStatus?.error) {
      setError(gateStore.gate.outputGateStatus?.message)
    }
  }, [gateStore])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }, [error])

  useEffect(() => {
    fetchGateStatus()
  }, [])

  return (
    <div className="panel h-100">
      <div className="panel__alert">
        <div className={`panel__alert-overlay ${error && '_active'}`}></div>
        <div className={`panel__alert-window bg-danger ${error && '_active'}`}>
          <h3 className="panel__alert-title text-center">{error}</h3>
        </div>
      </div>
      <h2 className="panel__title">Панель управления</h2>
      <div className="panel__form">
        <div className="row mt-3">
          <div className="col-md-12">
            <SwitchBox
              name="manual_mode"
              label="Ручное управление"
              className="panel__form-field"
              isChecked={isManualMode}
              setChecked={() =>
                isManualMode
                  ? switchGateMode(IGateModes.MODE_AUTO)
                  : switchGateMode(IGateModes.MODE_MANUAL)
              }
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <SwitchBox
              name="door1"
              label="Шлагбаум №1"
              className="panel__form-field"
              disabled={!isManualMode}
              isChecked={!isInputGateOpened}
              setChecked={() =>
                isInputGateOpened
                  ? closeGate(GatesIds.INPUT)
                  : openGate(GatesIds.INPUT)
              }
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <SwitchBox
              name="door2"
              label="Шлагбаум №2"
              className="panel__form-field"
              disabled={!isManualMode}
              isChecked={!isOutputGateOpened}
              setChecked={() =>
                isOutputGateOpened
                  ? closeGate(GatesIds.OUTPUT)
                  : openGate(GatesIds.OUTPUT)
              }
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <Button
              label="Создать запись на въезд"
              variant="success"
              className="panel__btn"
              disabled={!isManualMode}
              onClick={openModalEnter}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <Button
              label="Создать запись на выезд"
              variant="danger"
              className="panel__btn"
              disabled={!isManualMode}
              onClick={openModalExit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel
