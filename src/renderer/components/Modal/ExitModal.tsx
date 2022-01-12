/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import useActions from 'renderer/hooks/useActions';
import Button from '../base/Button';
import { setIsModalExitOpened } from '../../store/reducers/modalReducer';
import centrifuge from '../../utils/centrifuge';

const ExitModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((store) => store.modal.modalExit);
  const { removeCarFromTerritory } = useActions();
  const carsOnTerritory = useSelector((store) => store.cars.on_territory.items);
  const isModalVisible = modal.opened;
  const modalData = modal.data;
  const [terminalWeight, setTerminalWeight] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const timerRef = useRef(null);
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

  // const submitHandler = (e: any) => {
  //   e.preventDefault();
  //   const selectedCar = carsOnTerritory.find(
  //     (car) => car.id === parseInt(formData.id)
  //   );

  //   axios.post('http://localhost:8000/all_cars', {
  //     ...selectedCar,
  //     ...formData,
  //     date_of_exit: format(Date.now(), 'yyyy-MM-dd p', { locale: ru }),
  //     weight_netto: parseInt(modalData.weight),
  //     result_weight:
  //       parseInt(selectedCar.weight_brutto) - parseInt(modalData.weight),
  //     id: null,
  //     status: 'Выехал',
  //   });
  //   removeCarFromTerritory(formData.id);
  //   closeModal();

  // };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    // await axios.post(`${process.env.API_URL}/getAllTransportations`, {
    //   ...selectedCar,
    //   commentOnExit: formData.comment_on_exit,
    //   dateOfExit: format(Date.now(), 'yyyy-MM-dd p', { locale: ru }),
    //   weightNetto: terminalWeight,
    //   resultWeight:
    //     parseInt(selectedCar.weightBrutto) - parseInt(terminalWeight),
    //   id: null,
    //   status: 'Выехал',
    // });

    await axios.post(`${process.env.API_URL}/createCheckOut`, {
      actId: formData.id,
      weight: terminalWeight,
      commentCheckOut: formData.comment_on_exit,
    });
    removeCarFromTerritory(formData.id);
    closeModal();
  };

  const updateWeight = async () => {
    centrifuge.on('connect', function (ctx) {
      console.log('connected', ctx);
    });

    centrifuge.on('disconnect', function (ctx) {
      console.log('disconnected', ctx);
    });

    centrifuge.subscribe('channel', function (ctx) {
      console.log('weight received', ctx);
      setTerminalWeight(ctx.data.value);
    });
    centrifuge.connect();
  };

  useEffect(() => {
    if (isModalVisible && carsOnTerritory?.length) {
      updateWeight();
      setFormData((state) => ({
        ...state,
        id: modalData.selectedCar || carsOnTerritory[0]?.id,
      }));
    }
  }, [isModalVisible, carsOnTerritory]);

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
          <div className="modal__header d-flex justify-content-center">
            <h2 className="modal__title text-center">
              Взвешивание нетто:{' '}
              <span style={{ opacity: isUpdating ? '0' : '1' }}>
                {terminalWeight} &nbsp;кг
              </span>
            </h2>
            <svg
              className={`state__loader ${isUpdating && 'rotate'}`}
              fill="#e67e22"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="2rem"
              height="2rem"
              style={{ cursor: 'pointer', marginLeft: '2rem' }}
              onClick={() => updateWeight()}
            >
              <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
            </svg>
          </div>
          <form className="modal__form mt-5" onSubmit={submitHandler}>
            <div className="row mt-4">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="number_plate">Гос. номер авто</label>
                </div>
                <div className="col-md-6">
                  {/* <select
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
                    {/* {carsOnTerritory?.length ? (
                      carsOnTerritory?.map(({ id, number_plate }) => (
                        <option key={id} value={id}>
                          {number_plate}
                        </option>
                      ))
                    ) : (
                      <option value="" selected disabled>
                        Нет авто на территории
                      </option>
                    )} */}
                  {/* {carsOnTerritory?.length ? (
                    carsOnTerritory?.map(({ id, truck_number }) => (
                      <option key={id} value={id}>
                        {truck_number}
                      </option>
                    ))
                  ) : (
                    <option value="" selected disabled>
                      Нет авто на территории
                    </option>
                  )} */}
                  {/* </select> */}
                  <select
                    className="form-control"
                    name="contractor_company"
                    required
                    value={formData.id}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        id: e.target.value,
                      }))
                    }
                  >
                    {/* <option value="0">Не определен</option> */}
                    {carsOnTerritory?.length ? (
                      carsOnTerritory?.map(({ id, truck_number }) => (
                        <option key={id} value={id}>
                          {truck_number}
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
                disabled={isUpdating}
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
