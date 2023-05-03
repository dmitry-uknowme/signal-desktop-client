import React, { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useActions from "../../hooks/useActions";
import Button from "../base/Button";
import { setIsModalEnterOpened } from "../../store/reducers/modalReducer";
// import centrifuge from '../../utils/centrifuge'
import CentrifugeContext from "../../context/centrifuge/Context";
import { useQuery } from "react-query";
import getOrganizations from "../../api/getOrganizations";
import getCargoTypes from "../../api/getCargoTypes";
import getAutoRelations from "../../api/getAutoRelations";
import getCargoCategories from "../../api/getCargoCategories";

const EnterModal = () => {
  const { detectedAutoNumbers, setDetectedAutoNumbers } =
    useContext(CentrifugeContext);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    number_plate: "",
    payer_company: "",
    transporter_company: "Неизвестно",
    cargo_category: "",
    cargo_type: "",
    comment_on_enter: "",
  });
  const [relatedTransporters, setRelatedTransporters] = useState([]);
  const [relatedPayers, setRelatedPayers] = useState([]);
  const [isUseAutoRelations, setUseAutoRelations] = useState<boolean>(false);
  // const [contractors, setContractors] = useState([]);
  // const [cargoCategories, setCargoCategories] = useState([]);
  // const [cargoTypes, setCargoTypes] = useState([]);
  const { terminalWeight } = useContext(CentrifugeContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const { addCarOnTerritory } = useActions();
  const modal = useSelector((store) => store.modal.modalEnter);
  const isModalVisible = modal.opened;

  const closeModal = () => {
    dispatch(setIsModalEnterOpened(false));
    setTimeout(() => {
      setFormData({
        number_plate: "",
        contractor_company: "",
        transporter_company: "Неизвестно",
        cargo_category: "",
        cargo_type: "",
        comment_on_enter: "",
      });
    }, 5000);
    setDetectedAutoNumbers((state) => ({ ...state, IN: "" }));
  };

  const animationVariants = {
    modal: {
      show: { x: "-50%", y: "-50%" },
      hide: { x: "-50%", y: "-200%" },
    },
    overlay: {
      show: {
        pointerEvents: "all",
        opacity: "1",
      },
      hide: { pointerEvents: "none", opacity: "0" },
    },
  };

  const autoRelationsQuery = useQuery(
    ["autoRelations", detectedAutoNumbers.IN],
    async () => await getAutoRelations(detectedAutoNumbers.IN),
    {
      onSuccess: (data) => {
        const transporters = data?.data?.transporters;
        if (transporters?.length) {
          setRelatedTransporters(transporters);
        }
        const payers = data?.data?.payers;
        if (payers?.length) {
          setRelatedTransporters(payers);
        }
        setUseAutoRelations(true);
      },
      onError: (data) => setUseAutoRelations(false),
      enabled: !!detectedAutoNumbers.IN,
    }
  );

  const transportersQuery = useQuery(
    ["organizationTransporters"],
    async () => await getOrganizations({ role: "ROLE_TRANSPORTER" }),
    { enabled: !isUseAutoRelations }
  );

  const payersQuery = useQuery(
    ["organizationPayers"],
    async () => await getOrganizations({ role: "ROLE_PAYER" }),
    { enabled: !isUseAutoRelations }
  );

  const cargoTypesQuery = useQuery(
    ["cargoTypes"],
    async () => await getCargoTypes()
  );
  const cargoCategoriesQuery = useQuery(
    ["cargoCategories"],
    async () => await getCargoCategories()
  );

  const submitHandler = (e: any) => {
    // console.log('submit', formData)
    e.preventDefault();
    addCarOnTerritory({
      truckNumber: formData.number_plate,
      contractorId: formData.contractor_company,
      cargoType: formData.cargo_type,
      cargoCategory: formData.cargo_category,
      commentEntry: formData.comment_on_enter,
      weight: terminalWeight,
    });
    closeModal();
  };

  console.log("relateddd", { relatedPayers, relatedTransporters });

  useEffect(() => {
    if (detectedAutoNumbers?.IN) {
      setFormData((state) => ({
        ...state,
        number_plate: detectedAutoNumbers.IN,
      }));
    } else {
      setFormData((state) => ({ ...state, number_plate: "UNKNOWN" }));
    }
  }, [detectedAutoNumbers]);

  return (
    <motion.div
      className="modal__wrapper"
      initial={{
        opacity: 0,
      }}
      animate={animationVariants.overlay.show}
      exit={animationVariants.overlay.hide}
      // variants={animationVariants.overlay}
    >
      <motion.div
        className="modal__window modal-enter"
        initial={{
          x: "-50%",
          y: "-200%",
        }}
        transition={{ duration: 1 }}
        animate={animationVariants.modal.show}
        exit={animationVariants.modal.hide}
        // variants={animationVariants.modal}
      >
        <div className="container">
          <div className="modal__header d-flex justify-content-center">
            <h2 className="modal__title text-center">
              Взвешивание брутто:{" "}
              <span style={{ opacity: isUpdating ? "0" : "1" }}>
                {terminalWeight} кг
              </span>
            </h2>
            <svg
              className={`state__loader ${isUpdating && "rotate"}`}
              fill="#e67e22"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="2rem"
              height="2rem"
              style={{ cursor: "pointer", marginLeft: "2rem" }}
              // onClick={() => updateWeight()}
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
                    placeholder={
                      formData.number_plate === "UNKNOWN"
                        ? "Не определено"
                        : "О123ОО123"
                    }
                    value={
                      formData.number_plate === "UNKNOWN"
                        ? ""
                        : formData.number_plate
                    }
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        number_plate: e.target.value.toUpperCase(),
                      }))
                    }
                    minLength={8}
                    maxLength={10}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="contractor_company">Перевозчик</label>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    name="contractor_company"
                    required
                    value={formData.contractor_company}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        contractor_company: e.target.value,
                      }))
                    }
                  >
                    <option value="" selected disabled>
                      Выбор перевозчика
                    </option>
                    {relatedTransporters?.length
                      ? relatedTransporters.map((transporter) => (
                          <option
                            key={transporter.publicId}
                            value={transporter.publicId}
                          >
                            {transporter.title}
                          </option>
                        ))
                      : transportersQuery?.data?.data?.map((transporter) => (
                          <option
                            key={transporter.public_id}
                            value={transporter.public_id}
                          >
                            {transporter.title}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group row align-items-center">
                <div className="col-md-4">
                  <label htmlFor="contractor_company">Оператор</label>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    name="contractor_company"
                    required
                    value={formData.contractor_company}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        contractor_company: e.target.value,
                      }))
                    }
                  >
                    <option value="" selected disabled>
                      Выбор оператора
                    </option>
                    {relatedPayers?.length
                      ? relatedPayers.map((payer) => (
                          <option key={payer.publicId} value={payer.publicId}>
                            {payer.title}
                          </option>
                        ))
                      : payersQuery?.data?.data?.map((payer) => (
                          <option key={payer.public_id} value={payer.public_id}>
                            {payer.title}
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
                    value={formData.cargo_category.id}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        cargo_category: e.target.value,
                      }))
                    }
                  >
                    {/* <option value="" selected disabled>
                      Название категории груза
                    </option> */}
                    {cargoCategoriesQuery?.data?.data?.map(({ id, title }) => (
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
                    value={formData.cargo_type.id}
                    onChange={(e) =>
                      setFormData((state) => ({
                        ...state,
                        cargo_type: e.target.value,
                      }))
                    }
                  >
                    {cargoTypesQuery?.data?.data?.map(({ id, title }) => (
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