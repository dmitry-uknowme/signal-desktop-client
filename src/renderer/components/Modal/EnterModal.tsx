/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../base/Button';
import { setIsModalEnterOpened } from '../../store/reducers/modalReducer';

const EnterModal = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((store) => store.modal.modalEnter);
  const closeModal = () => dispatch(setIsModalEnterOpened(false));

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
        className="modal__window modal-enter"
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
            Взвешивание брутто: 1500 кг
          </h2>
          <form className="modal__form mt-5">
            <div className="row">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="auto_number_plate">Гос. номер авто</label>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control text-uppercase"
                    name="auto_number_plate"
                    placeholder="о777oo77"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="contractor_name">Контрагент</label>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    name="contractor_name"
                    required
                  >
                    <option value="" selected disabled>
                      Название контрагента
                    </option>
                    <option value="1">{`ООО "ДИСПЕТЧЕР-С"`}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="cargo_category">Категория груза</label>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    name="cargo_category"
                    required
                  >
                    <option value="" selected disabled>
                      Название категории груза
                    </option>
                    <option value="1">ТКО-4</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="cargo_type">Вид груза</label>
                </div>
                <div className="col-md-6">
                  <select className="form-control" name="cargo_type" required>
                    <option value="" selected disabled>
                      Название вида груза
                    </option>
                    <option value="1">Прочее</option>
                  </select>
                </div>
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

export default EnterModal;
