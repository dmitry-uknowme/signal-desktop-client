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
    <div
      className="modal__wrapper" /* onClick={() => setModalVisible(false)} */
    >
      <motion.div
        initial={{ x: '-50%', y: '-50%' }}
        animate={isModalVisible ? 'show' : 'hide'}
        variants={animationVariants.modal}
        className="modal__window modal-enter"
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
                    className="form-control"
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
                    <option value="834bb845-0497-43f6-b5f7-4a53d88fbb4e">
                      Название контрагента
                    </option>
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
                    <option value="834bb845-0497-43f6-b5f7-4a53d88fbb4e">
                      Название категории груза
                    </option>
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
                    <option value="834bb845-0497-43f6-b5f7-4a53d88fbb4e">
                      Название вида груза
                    </option>
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
