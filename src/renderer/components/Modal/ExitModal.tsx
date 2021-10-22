/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../base/Button';
import { setIsModalExitOpened } from '../../store/reducers/modalReducer';

const ExitModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((store) => store.modal.modalExit);
  const isModalVisible = modal.opened;
  const modalData = modal.data;
  const closeModal = () => dispatch(setIsModalExitOpened());

  console.log('modal', modalData.autos);

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
  };

  return (
    <motion.div
      className="modal__wrapper"
      initial={{
        opacity: 0,
      }}
      animate={isModalVisible ? 'show' : 'hide'}
      variants={animationVariants.overlay}
    >
      <motion.div
        className="modal__window modal-exit"
        initial={{
          x: '-50%',
          y: '-200%',
        }}
        transition={{ duration: 1 }}
        animate={isModalVisible ? 'show' : 'hide'}
        variants={animationVariants.modal}
      >
        <div className="container">
          <h2 className="modal__title text-center">
            Взвешивание нетто: {modalData?.weight} кг
          </h2>
          <form className="modal__form mt-5">
            <div className="row mt-4">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="auto_number_plate">Гос. номер авто</label>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    name="auto_number_plate"
                    required
                  >
                    {modalData?.autos?.length ? (
                      modalData?.autos?.map(({ id, number_plate }) => (
                        <option value={id}>{number_plate}</option>
                      ))
                    ) : (
                      <option>Нет авто на территории</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="row mt-4 align-items-center">
                  <div className="form-group row align-items-center">
                    <div className="col-md-12">
                      <label htmlFor="contractor_name">Контрагент</label>
                    </div>
                  </div>
                </div>
                <div className="row mt-4 align-items-center">
                  <div className="form-group row align-items-center">
                    <div className="col-md-12">
                      <label htmlFor="contractor_name">Категория груза</label>
                    </div>
                  </div>
                </div>
                <div className="row mt-4 align-items-center">
                  <div className="form-group row align-items-center">
                    <div className="col-md-12">
                      <label htmlFor="contractor_name">Вид груза</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                (Поля заполнены при въезде)
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group row">
                <div className="col-md-4">
                  <label htmlFor="comment">Комментарий</label>
                </div>
                <div className="col-md-6">
                  <textarea
                    className="w-100"
                    name="comment"
                    rows={5}
                    placeholder="Комментарий"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-5">
              <Button
                label="Отклонить"
                variant="danger"
                onClick={closeModal}
                type="button"
              />
              <Button
                label="Разрешить въезд"
                variant="success"
                // onClick={closeModal}
              />
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExitModal;
