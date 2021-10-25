/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import useActions from 'renderer/hooks/useActions';
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
  const { addCarOnTerritory } = useActions();
  const modal = useSelector((store) => store.modal.modalEnter);
  const isModalVisible = modal.opened;
  const modalData = modal.data;
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

  const fetchDropdownFields = async () => {
    const contractorResponse = await axios.get(
      'http://localhost:8000/contractors'
    );
    setContractors(contractorResponse.data);

    const cargoCategoriesResponse = await axios.get(
      'http://localhost:8000/cargo_categories'
    );
    setCargoCategories(cargoCategoriesResponse.data);

    const cargoTypesResponse = await axios.get(
      'http://localhost:8000/cargo_types'
    );
    setCargoTypes(cargoTypesResponse.data);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    axios.post('http://localhost:8000/cars_on_territory', {
      ...formData,
      date_of_enter: Date.now(),
      weight_brutto: parseInt(modalData.weight),
    });
    addCarOnTerritory({
      ...formData,
      date_of_enter: Date.now(),
      weight_brutto: parseInt(modalData.weight),
    });
    closeModal();
  };

  useEffect(() => {
    if (isModalVisible) {
      fetchDropdownFields();
    }
  }, [isModalVisible]);

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
            Взвешивание брутто: {modalData?.weight} кг
          </h2>
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
                    placeholder="о777oo77"
                    required
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        number_plate: e.target.value,
                      }))
                    }
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
                    name="contractor_company"
                    required
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
                    {contractors?.map(({ id, name }) => (
                      <option key={id} value={name}>
                        {name}
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
                    {cargoCategories?.map(({ id, name }) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
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
                  <select
                    className="form-control"
                    name="cargo_type"
                    required
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
                    {cargoTypes?.map(({ id, name }) => (
                      <option key={id} value={name}>
                        {name}
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
