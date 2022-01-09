/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import useActions from 'renderer/hooks/useActions';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Button from '../base/Button';

import { setIsModalEnterOpened } from '../../store/reducers/modalReducer';

const EnterModal = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    number_plate: '',
    contractor_company: '',
    transporter_company: 'Неизвестно',
    cargo_category: '',
    cargo_type: '',
    comment_on_enter: '',
  });
  const [contractors, setContractors] = useState();
  const [cargoCategories, setCargoCategories] = useState();
  const [cargoTypes, setCargoTypes] = useState();
  const [terminalWeight, setTerminalWeight] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const { addCarOnTerritory } = useActions();
  const modal = useSelector((store) => store.modal.modalEnter);
  const isModalVisible = modal.opened;
  const modalData = modal.data;
  const timerRef = useRef(null);

  // console.log('visib', isModalVisible);

  const closeModal = () => {
    dispatch(setIsModalEnterOpened(false));
    setTimeout(() => {
      setFormData({
        number_plate: '',
        contractor_company: '',
        transporter_company: 'Неизвестно',
        cargo_category: '',
        cargo_type: '',
        comment_on_enter: '',
      });
      // console.log('closseee time');dd
    }, 5000);
  };

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

  // const fetchDropdownFields = async () => {
  //   const contractorResponse = await axios.get(
  //     'http://localhost:8000/contractors'
  //   );
  //   setContractors(contractorResponse.data);

  //   const cargoCategoriesResponse = await axios.get(
  //     'http://localhost:8000/cargo_categories'
  //   );
  //   setCargoCategories(cargoCategoriesResponse.data);

  //   const cargoTypesResponse = await axios.get(
  //     'http://localhost:8000/cargo_types'
  //   );
  //   setCargoTypes(cargoTypesResponse.data);
  // };

  const fetchDropdownFields = async () => {
    const contractorResponse = await axios.get(
      'http://localhost:8000/getOrganizations'
    );
    setContractors(contractorResponse.data.items);

    const cargoCategoriesResponse = await axios.get(
      'http://localhost:8000/getCargoCategories'
    );
    setCargoCategories(cargoCategoriesResponse.data.items);

    const cargoTypesResponse = await axios.get(
      'http://localhost:8000/getCargoTypes'
    );
    setCargoTypes(cargoTypesResponse.data.items);
  };

  const updateWeight = async () => {
    setIsUpdating(true);
    const weightResponse = await axios.get('http://localhost:8000/getScale');
    setTimeout(() => {
      setTerminalWeight(weightResponse.data.weight);
      setIsUpdating(false);
    }, 500);
  };
  // const submitHandler = (e: any) => {
  //   e.preventDefault();
  //   addCarOnTerritory({
  //     ...formData,
  //     date_of_enter: format(Date.now(), 'yyyy-MM-dd p', { locale: ru }),
  //     weight_brutto: parseInt(modalData.weight),
  //   });
  //   closeModal();
  // };
  const submitHandler = (e: any) => {
    e.preventDefault();
    addCarOnTerritory({
      number: formData.number_plate,
      organizationId: formData.contractor_company,
      cargoTypeId: formData.cargo_type,
      cargoCategoryId: formData.cargo_category,
      commentOnEnter: formData.comment_on_enter,
      weightBrutto: terminalWeight,
      dateOfEnter: format(Date.now(), 'yyyy-MM-dd p', { locale: ru }),
    });
    closeModal();
  };

  useEffect(() => {
    if (isModalVisible) {
      fetchDropdownFields();
    }
  }, [isModalVisible]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (isModalVisible) {
        // console.log('timer');
        updateWeight();
      } else {
        return clearInterval(timerRef.current);
      }
    }, 3000);
    if (!isModalVisible) {
      return clearInterval(timerRef.current);
    }
  }, [isModalVisible]);

  useEffect(() => {
    updateWeight();
  }, []);

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
          <div className="modal__header d-flex justify-content-center">
            <h2 className="modal__title text-center">
              Взвешивание брутто:{' '}
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
            <div className="row">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="number_plate">Гос. номер авто</label>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control text-uppercase"
                    name="number_plate"
                    placeholder="О123ОО123"
                    required
                    value={formData.number_plate}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        number_plate: e.target.value.toUpperCase(),
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="contractor_company">Контрагент</label>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    name="contractor_company"
                    required
                    value={formData.contractor_company.id}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        contractor_company: e.target.value,
                      }))
                    }
                  >
                    <option value="" selected disabled>
                      Название контрагента
                    </option>
                    {contractors?.map(({ id, full_name }) => (
                      <option key={id} value={id}>
                        {full_name}
                      </option>
                    ))}
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
                    value={formData.cargo_category.id}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        cargo_category: e.target.value,
                      }))
                    }
                  >
                    <option value="" selected disabled>
                      Название категории груза
                    </option>
                    {cargoCategories?.map(({ id, title }) => (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    ))}
                  </select>
                  {/* <select
                    className="form-control"
                    name="cargo_category"
                    required
                    value={formData.cargo_category.id}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        cargo_category: e.target.value,
                      }))
                    }
                  >
                    <option value="" selected disabled>
                      Название категории груза
                    </option>
                    {cargoCategories?.map(({ id, title }) => (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    ))}
                  </select> */}
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="cargo_type">Вид груза</label>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    name="cargo_type"
                    required
                    value={formData.cargo_type.id}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        cargo_type: e.target.value,
                      }))
                    }
                  >
                    <option value="" selected disabled>
                      Название вида груза
                    </option>
                    {cargoTypes?.map(({ id, title }) => (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group row">
                <div className="col-md-4">
                  <label htmlFor="comment_on_enter">Комментарий</label>
                </div>
                <div className="col-md-6">
                  <textarea
                    className="w-100"
                    name="comment_on_enter"
                    rows={5}
                    placeholder="Комментарий"
                    value={formData.comment_on_enter}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        comment_on_enter: e.target.value,
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
                label="Разрешить въезд"
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

export default EnterModal;
