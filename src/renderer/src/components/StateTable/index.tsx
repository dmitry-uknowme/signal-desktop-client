/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */

import React from 'react'

interface IHardwareItem {
  name: string
  status: string
}

interface HardwareTableProps {
  isRefreshing: boolean
  distanceToNow: string
  data: IHardwareItem[]
  isNotShowDate: boolean
}

const StateTable: React.FC<HardwareTableProps> = ({
  isRefreshing,
  distanceToNow,
  data,
  isNotShowDate,
}) => {
  return (
    <div className="state__table h-100">
      <div className="row align-items-center">
        <div className={isNotShowDate ? 'col-md-6 offset-md-1' : 'col-md-4'}>
          <div className="row flex-column">
            {data?.map(({ name }) => (
              <div className="col-md-12 state__item" key={name}>
                {name}
              </div>
            ))}
          </div>
        </div>
        {isRefreshing ? (
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <svg
              className="state__loader rotate"
              fill="#e67e22"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="4rem"
              height="4rem"
              style={{ cursor: 'pointer' }}
            >
              <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
            </svg>
          </div>
        ) : (
          <>
            <div className={isNotShowDate ? 'col-md-4' : 'col-md-2'}>
              <div className="row flex-column">
                {data?.map(({ name, status }) => (
                  <div className="col-md-12 state__item" key={name}>
                    {status === 'online' ? (
                      <div
                        className="text-success text-capitalize"
                        style={{ fontWeight: 700 }}
                      >
                        {status}
                      </div>
                    ) : status === 'offline' ? (
                      <div
                        className="text-danger text-capitalize"
                        style={{ fontWeight: 700 }}
                      >
                        {status}
                      </div>
                    ) : (
                      <div
                        className="text-capitalize"
                        style={{ color: 'rgba(255,0,0,0.7)', fontWeight: 700 }}
                      >
                        {status}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {!isNotShowDate && (
              <div className="col-md-6">
                <div className="row flex-column">
                  {data?.map(({ name, status }) => (
                    <div className="col-md-12 state__item" key={name}>
                      Обновлено: &nbsp; {distanceToNow}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default StateTable
