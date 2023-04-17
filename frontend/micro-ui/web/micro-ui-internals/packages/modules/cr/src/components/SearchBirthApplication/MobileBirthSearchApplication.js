import React, { Fragment, useCallback, useMemo, useReducer } from "react";
import {
  CloseSvg,
  SearchForm,
  Table,
  Card,
  SearchAction,
  PopUp,
  DetailsCard,
  Loader,
  Toast,
} from "@egovernments/digit-ui-react-components";
import SearchFormFields from "./SearchFields";


const MobileSearchApplication = ({ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit}) => {

  function activateModal(state, action) {
    switch (action.type) {
      case "set":
        return action.payload;
      case "remove":
        return false;
      default:
        break;    }
  }

  const [currentlyActiveMobileModal, setActiveMobileModal] = useReducer(activateModal, false);

  const closeMobilePopupModal = () => {
    setActiveMobileModal({ type: "remove" });
  };

  const MobilePopUpCloseButton = () => (
    <div className="InboxMobilePopupCloseButtonWrapper" onClick={closeMobilePopupModal}>
      <CloseSvg />
    </div>
  );

  const searchFormFieldsComponentProps = { Controller, register, control, t, reset, previousPage };

  const MobileComponentDirectory = ({ currentlyActiveMobileModal, searchFormFieldsComponentProps, tenantId, ...props }) => {
    const { closeMobilePopupModal } = props;
    switch (currentlyActiveMobileModal) {
      case "SearchFormComponent":
        return (
          <SearchForm {...props}>
            <MobilePopUpCloseButton />
            <div className="MobilePopupHeadingWrapper">
              <h2>{t("ES_COMMON_SEARCH")}:</h2>
            </div>
            <SearchFormFields {...searchFormFieldsComponentProps} {...{ closeMobilePopupModal, tenantId, t }} />
            {/* <SearchField className="submit">
                      <SubmitBar label={t("ES_COMMON_SEARCH")} submit form="search-form"/>
                      <p onClick={onResetSearchForm}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
                  </SearchField> */}
          </SearchForm>
        );
      default:
        return <span></span>;
    }
  };

  const CurrentMobileModalComponent = useCallback(
    ({ currentlyActiveMobileModal, searchFormFieldsComponentProps, tenantId, ...props }) =>
      MobileComponentDirectory({ currentlyActiveMobileModal, searchFormFieldsComponentProps, tenantId, ...props }),
    [currentlyActiveMobileModal]
  );


  const propsMobileInboxCards = useMemo(
    () => {
      if (data?.display){
        return []
      }
      if(data === "")
      {
      return [];
      }
      return data?.map((data) => ({
        [t("TL_COMMON_TABLE_COL_APP_NO")]: data.TL_COMMON_TABLE_COL_APP_NO,
        // [t("CR_NAME")]: data.CR_NAME,
        [t("CR_FATHER_NAME")]: data.CR_FATHER_NAME,
        [t("CR_COMMON_MOTHER_NAME")]: data.CR_MOTHER_NAME,
        [t("CR_ADDRESS")]: data.CR_ADDRESS,
        [t("TL_CITY_NAME")]: data.TL_COMMON_CITY_NAME,
       }))
    },
    [data]
  );

  return (
    <React.Fragment>
      <div className="searchBox">
        <SearchAction
          text={t("ES_COMMON_SEARCH")}
          handleActionClick={() => setActiveMobileModal({ type: "set", payload: "SearchFormComponent" })}
          {...{tenantId, t}} 
        />
        {/* {isInboxLoading ? <Loader /> : <FilterAction text={t("ES_COMMON_FILTER")} handleActionClick={() => setActiveMobileModal({type:"set", payload:"FilterFormComponent"})}/>} */}
        {/* <SortAction text={t("ES_COMMON_SORT")} handleActionClick={() => setActiveMobileModal({type:"set", payload:"SortComponent"})}/> */}
      </div>
      {currentlyActiveMobileModal ? (
        <PopUp>
          <CurrentMobileModalComponent
            onSubmit={(data) => {
              setActiveMobileModal({ type: "remove" });
              onSubmit(data);
            }}
            handleSubmit={handleSubmit}
            id="search-form"
            className="rm-mb form-field-flex-one inboxPopupMobileWrapper"
            {...{ searchFormFieldsComponentProps, currentlyActiveMobileModal, closeMobilePopupModal, tenantId }}
          />
        </PopUp>
      ) : null}
      {data?.display ? (
        <Card style={{ marginTop: 20 }}>
          {t(data?.display)
            .split("\\n")
            .map((text, index) => (
              <p key={index} style={{ textAlign: "center" }}>
                {text}
              </p>
            ))}
        </Card>
      ) : (
        <DetailsCard
          {...{
            data: propsMobileInboxCards,
            linkPrefix: `/digit-ui/employee/cr/application-details/`,
            serviceRequestIdKey: t("TL_COMMON_TABLE_COL_APP_NO"),
          }}
        />
      )}
    </React.Fragment>
  )
}

export default MobileSearchApplication