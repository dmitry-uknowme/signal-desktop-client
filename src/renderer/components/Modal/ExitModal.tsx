/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import useActions from 'renderer/hooks/useActions';
import Button from '../base/Button';
import { setIsModalExitOpened } from '../../store/reducers/modalReducer';

const ExitModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((store) => store.modal.modalExit);
  const { removeCarFromTerritory } = useActions();
  const carsOnTerritory = useSelector((store) => store.cars.on_territory);
  const isModalVisible = modal.opened;
  const modalData = modal.data;
  const closeModal = () => dispatch(setIsModalExitOpened());

  const [formData, setFormData] = useState({
    id: '',
    comment_on_exit: '',
  });

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

  const submitHandler = (e: any) => {
    e.preventDefault();
    const selectedCar = carsOnTerritory.find(
      (car) => car.id === parseInt(formData.id)
    );

    axios.post('http://localhost:8000/all_cars', {
      ...selectedCar,
      ...formData,
      date_of_exit: Date.now(),
      weight_netto: parseInt(modalData.weight),
      result_weight:
        parseInt(selectedCar.weight_brutto) - parseInt(modalData.weight),
      id: null,
      status: 'Выехал',
    });
    removeCarFromTerritory(formData.id);
    closeModal();
  };

  useEffect(() => {
    setFormData((state) => ({ ...state, id: carsOnTerritory[0]?.id }));
  }, [carsOnTerritory]);

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
          <form className="modal__form mt-5" onSubmit={submitHandler}>
            <div className="row mt-4">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="number_plate">Гос. номер авто</label>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    name="number_plate"
                    required
                    value={formData.id}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        id: e.target.value,
                      }))
                    }
                  >
                    {carsOnTerritory?.length ? (
                      carsOnTerritory?.map(({ id, number_plate }) => (
                        <option key={id} value={id}>
                          {number_plate}
                        </option>
                      ))
                    ) : (
                      <option value="" selected disabled>
                        Нет авто на территории
                      </option>
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
                  <label htmlFor="comment_on_exit">Комментарий</label>
                </div>
                <div className="col-md-6">
                  <textarea
                    className="w-100"
                    name="comment_on_exit"
                    rows={5}
                    placeholder="Комментарий"
                    value={formData.comment_on_exit}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        comment_on_exit: e.target.value,
                      }))
                    }
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
                label="Разрешить выезд"
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
