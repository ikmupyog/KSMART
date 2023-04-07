import { Banner, Card, LinkButton } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToDeathRegistration, convertToEditDeathRegistration } from "../../../utils/deathindex";
import getPDFData from "../../../utils/getTLAcknowledgementData";
import { useHistory } from "react-router-dom";

const GetActionMessage = (props) => {
  // const history = useHistory();

  const { t } = useTranslation();
  // useEffect(() => {
  //   const CR_DEATH_EDIT_FLAG = sessionStorage.getItem('CR_DEATH_EDIT_FLAG');
  //   if (CR_DEATH_EDIT_FLAG === 'true' && props.isSuccess) {
  //     history.push('/digit-ui/employee/cr/application-deathdetails');
  //   }
  // }, [props.isSuccess, history]);

  if (props.isSuccess) {
    // console.log(props.isSuccess);
    return t("CR_CREATE_SUCCESS_MSG");
  } else if (props.isLoading) {
    return !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application")
      ? t("CR_APPLICATION_SUCCESS")
      : t("CR_UPDATE_APPLICATION_SUCCESS");
  } else if (!props.isSuccess) {
    return t("CR_CREATE_APPLICATION_FAILED");
  }
};

const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  // console.log(JSON.stringify(props));

  return (
    // <Banner
    //   message={GetActionMessage(props)}
    //   applicationNumber={props.data?.Licenses[0]?.applicationNumber}
    //   info={props.isSuccess ? props.t("AK-16-2023-CRDRNR-C-KOCHI-KL") : ""}
    //   successful={props.isSuccess}
    // />

    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props.data?.deathCertificateDtls[0]?.InformationDeath?.DeathACKNo}
      info={props.isSuccess ? props.applicationNumber : ""}
      successful={props.isSuccess}
    />
  );
};
const DeathAcknowledgement = ({ data, onSuccess: successAction, userType }) => {
  
  const { t } = useTranslation();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const resubmit = window.location.href.includes("edit-application");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isRenewTrade = !window.location.href.includes("renew-trade");
  
  const [isEditDeath, setIsEditDeath] = useState(sessionStorage.getItem("CR_DEATH_EDIT_FLAG") ? true : false);
  
  console.log({isEditDeath})
  // console.log("isEditDeath" + isEditDeath);
  const mutation = Digit.Hooks.cr.useCivilRegistrationDeathAPI(tenantId, isEditDeath ? false : true);
  // console.log(mutation);
  // console.log("isEditDeath" + isEditDeath);

  // const mutation1 = Digit.Hooks.cr.useCivilRegistrationDeathAPI(
  //   data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId,
  //   false
  // );
  // const mutation2 = Digit.Hooks.cr.useCivilRegistrationDeathAPI(
  //   data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId,
  //   false
  // );
  const isEdit = window.location.href.includes("renew-trade");
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  const stateId = Digit.ULBService.getStateId();
  // const { isLoading, data: fydata = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "egf-master", "FinancialYear");
  // let isDirectRenewal = sessionStorage.getItem("isDirectRenewal") ? stringToBoolean(sessionStorage.getItem("isDirectRenewal")) : null;
  const [isInitialRender, setIsInitialRender] = useState(true);
  // const onSuccess = (data) => {
  //   successAction();
  //   console.log({ data });
  //   onSuccess();
  //   if (isEditDeath) {
  //     const { deathCertificateDtls: { InformationDeath: { DeathACKNo } = {} } = {} } = data;
  //     if (DeathACKNo) {
  //       history.push(`/digit-ui/employee/cr/application-deathdetails/${DeathACKNo}`);
  //     }
  //   }
  // };
  // const { deathCertificateDtls: { InformationDeath: { DeathACKNo } = {} } = {} } = data;

  // const handleClick = () => {
  //   history.push();
  // }
  useEffect(() => {
    if (isInitialRender) {
      // const onSuccessedit = () => {
      //   setMutationHappened(true);
      // };
      try {
        setIsInitialRender(false);
        let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
        data.tenantId = tenantId1;
        if (!resubmit) {
          // let formdata = !isEdit ? convertToDeathRegistration(data) : convertToEditTrade(data, fydata["egf-master"] ? fydata["egf-master"].FinancialYear.filter(y => y.module === "CR") : []);
          let formdata = !isEditDeath ? convertToDeathRegistration(data) : convertToEditDeathRegistration(data);
          console.log({ formdata, isEditDeath });
          // let formdata = !isEdit ? convertToDeathRegistration(data):[] ;
          let mutatea = mutation.mutate(formdata, {
            isSuccess: (response) => {
              console.log({ response });
            },
          });
          console.log(mutatea);

          // else{
          //   if((fydata["egf-master"] && fydata["egf-master"].FinancialYear.length > 0 && isDirectRenewal))
          //   {
          //     mutation2.mutate(formdata, {
          //       onSuccess,
          //     })
          //   }
          //   else
          //   {
          //     mutation1.mutate(formdata, {
          //       onSuccess,
          //     })
          //   }
          // }

          // !isEdit ? mutation.mutate(formdata, {
          //   onSuccess,
          // }) : (fydata["egf-master"] && fydata["egf-master"].FinancialYear.length > 0 && isDirectRenewal ? mutation2.mutate(formdata, {
          //   onSuccess,
          // }) :mutation1.mutate(formdata, {
          //   onSuccess,
          // }));
        } else {
          // let formdata = convertToResubmitTrade(data);
          // formdata.Licenses[0].tenantId = formdata?.Licenses[0]?.tenantId || tenantId1;
          // !mutation2.isLoading && !mutation2.isSuccess &&!mutationHappened && mutation2.mutate(formdata, {
          //   onSuccessedit,
          // })
        }
      } catch (err) {
        console.error({ err });
      }
    }
  }, [mutation]);

  // useEffect(() => {
  //   if (mutation.isSuccess || (mutation1.isSuccess && isEdit && !isDirectRenewal)) {
  //     try {
  //       let Licenses = !isEdit ? convertToUpdateTrade(mutation.data, data) : convertToUpdateTrade(mutation1.data, data);
  //       mutation2.mutate(Licenses, {
  //         onSuccess,
  //       });
  //     }
  //     catch (er) {
  //     }
  //   }
  // }, [mutation.isSuccess, mutation1.isSuccess]);

  const handleDownloadPdf = async () => {
    const { Licenses = [] } = mutation.data;
    const License = (Licenses && Licenses[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === License.tenantId);
    let res = License;
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };

  if (mutation.isSuccess && mutation?.isError === null) {
    console.log({formdata, isEditDeath});
    if (isEditDeath) {
      history.push(`/digit-ui/employee/cr/application-deathdetails/${formdata.InformationDeath["DeathACKNo"]}`);
    } else {
      return (
        <Card>
          <BannerPicker t={t} data={mutation.data} isSuccess={"success"} isLoading={mutation.isIdle || mutation.isLoading} />
          <LinkButton
            label={
              <div className="response-download-button">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                </span>
                <span className="download-button">{t("Acknowledgment454545")}</span>
              </div>
            }
            onClick={handleDownloadPdf}
          />
        </Card>
      );
    }
  } else {
    return (
      <Card>
        <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation?.isLoading} />
        {/* {<CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>} */}
        <Link to={`/digit-ui/employee`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  }
};

export default DeathAcknowledgement;
