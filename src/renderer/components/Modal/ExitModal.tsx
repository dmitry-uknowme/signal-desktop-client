/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../base/Button';

const EnterModal = () => {
  const [isModalVisible, setModalVisible] = useState(true);

  const animationVariants = {
    modal: {
      show: { scale: 1, x: '-50%', y: '-50%' },
      hide: { scale: 0, x: '-50%', y: '-50%' },
    },
  };

  return (
    <div className="modal__wrapper">
      <motion.div
        animate={isModalVisible ? 'show' : 'hide'}
        variants={animationVariants.modal}
        className="modal__window modal-enter"
      >
        <div className="container">
          <h2 className="modal__title text-center">
            Взвешивание нетто: 500 кг
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
                    <option value="о777oo77">о777oo77</option>
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
              <Button label="Отклонить" variant="danger" />
              <Button label="Разрешить въезд" variant="success" />
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EnterModal;
