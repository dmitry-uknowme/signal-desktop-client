/* eslint-disable react/prop-types */
import React from 'react'
import { motion } from 'framer-motion'
import { ButtonProps } from 'rsuite'
import Button from '../base/Button'

interface ModalProps {
  isVisible: boolean
  headerText: string
  bodyText?: string
  body?: React.ReactNode
  btns?: ButtonProps[]
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  headerText,
  bodyText,
  body,
  btns,
}) => {
  const Body = body
  const animationVariants = {
    modal: {
      show: { x: '-50%', y: '-50%' },
      hide: { x: '-50%', y: '-200%' },
    },
    overlay: {
      show: {
        pointerEvents: 'all',
        opacity: 1,
      },
      hide: { pointerEvents: 'none', opacity: 0 },
    },
  }
  return (
    <motion.div
      className="modal__wrapper"
      initial={{
        opacity: 0,
      }}
      animate={isVisible ? 'show' : 'hide'}
      variants={animationVariants.overlay}
    >
      <motion.div
        className="modal__window modal-exit"
        initial={{
          x: '-50%',
          y: '-200%',
        }}
        transition={{ duration: 1 }}
        animate={isVisible ? 'show' : 'hide'}
        variants={animationVariants.modal}
      >
        <div className="container">
          <div className="modal__header d-flex justify-content-center">
            <h2 className="modal__title text-center">{headerText}</h2>
          </div>
          <div className="modal__body">
            <p className="text-center">{bodyText || Body}</p>
          </div>
          {btns?.length ? (
            <div className="modal__footer">
              {btns.map(btn => (
                <div className="col-md-8">
                  <Button {...btn} />
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Modal
