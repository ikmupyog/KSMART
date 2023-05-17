import React from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { PrivateRoute, BreadCrumb, DocumentIcon, CardLabel } from "@egovernments/digit-ui-react-components";
import { ReactComponent as BankIcon } from "../Img/BankIcon.svg";
import { ReactComponent as FileProtected } from "../Img/FileProtected.svg";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../../../utils";

const CrFlow = ({ path }) => {
  const { t } = useTranslation();
  //New Registration
  sessionStorage.removeItem("CR_BIRTH_EDIT_FLAG");
  sessionStorage.removeItem("Digit.CR_EDIT_BIRTH_REG");
  sessionStorage.removeItem("CR_STILLBIRTH_EDIT_FLAG");
  sessionStorage.removeItem("Digit.CR_EDIT_STILLBIRTH_REG");
  sessionStorage.removeItem("CR_BORNOUTSIDEBIRTH_EDIT_FLAG");
  sessionStorage.removeItem("CR_NACBIRTH_EDIT_FLAG");
  sessionStorage.removeItem("Digit.CR_EDIT_BORNOUTSIDEBIRTH_REG");
  sessionStorage.removeItem("CR_ABANDONEDBIRTH_EDIT_FLAG");
  sessionStorage.removeItem("Digit.CR_EDIT_ABANDONEDBIRTH_REG");
  let links = [
    
    // HOSPITAL_OPERATOR START----------------------------------//
    {
      title: "CR_BIRTH_REGISTRATION",
      subTitle: "CR_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-birth/child-details`,
      role: "HOSPITAL_OPERATOR"
    },
    {
      title: "CR_STILL_BIRTH_REG",
      subTitle: "CR_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-stillbirth/stillbirth-child-details`,
      role: "HOSPITAL_OPERATOR"
    },
    // HOSPITAL_OPERATOR END ----------------------------------------------------------//

    // HOSPITAL_APPROVER START--------------------------------------------------------//
    {
      title: "CR_BIRTH_REGISTRATION",
      subTitle: "CR_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-birth/child-details`,
      role: "HOSPITAL_APPROVER"
    },
    {
      title: "CR_STILL_BIRTH_REG",
      subTitle: "CR_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-stillbirth/stillbirth-child-details`,
      role: "HOSPITAL_APPROVER"
    },
    // HOSPITAL_APPROVER END----------------------------------------------------------

    // BND_DISTRICT_REGISTRAR START----------------------------------------------------------

    {
      title: "CR_ABANDONED_BIRTH_REGISTRATION",
      subTitle: "CR_ABANDONED_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-abandonedbirth/abandoned-child-details`,
      role: "BND_DISTRICT_REGISTRAR"
    },

    // BND_LOCAL_REGISTRAR START----------------------------------------------------------

    {
      title: "CR_ABANDONED_BIRTH_REGISTRATION",
      subTitle: "CR_ABANDONED_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-abandonedbirth/abandoned-child-details`,
      role: "BND_LOCAL_REGISTRAR"
    },

    // BND_LOCAL_REGISTRAR END----------------------------------------------------------

    // BND_SUB_REGISTRAR START----------------------------------------------------------

    {
      title: "CR_ABANDONED_BIRTH_REGISTRATION",
      subTitle: "CR_ABANDONED_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-abandonedbirth/abandoned-child-details`,
      role: "BND_SUB_REGISTRAR"
    },

    // BND_SUB_REGISTRAR END-----------------------------------------------------------

    // JHI START-------------------------------------------------------------------------
  
    // JHI END-------------------------------------------------------------------------

    // INSTITUTION_OPERATOR START-------------------------------------------------------------------------

    {
      title: "CR_BIRTH_REGISTRATION",
      subTitle: "CR_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-birth/child-details`,
      role: "INSTITUTION_OPERATOR"
    },

    // INSTITUTION_OPERATOR END-------------------------------------------------------------------------

    // INSTITUTION_APPROVER START-------------------------------------------------------------------------

    {
      title: "CR_BIRTH_REGISTRATION",
      subTitle: "CR_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-birth/child-details`,
      role: "INSTITUTION_APPROVER"
    },

    // INSTITUTION_APPROVER END-------------------------------------------------------------------------

    // OFFICIAL_NOTIFIER START-------------------------------------------------------------------------

    {
      title: "CR_ABANDONED_BIRTH_REGISTRATION",
      subTitle: "CR_ABANDONED_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-abandonedbirth/abandoned-child-details`,
      role: "OFFICIAL_NOTIFIER"
    },

    // OFFICIAL_NOTIFIER END-------------------------------------------------------------------------

    // BND_CEMP START-----------------------------------------------------------------------------------

    {
      title: "CR_BIRTH_REGISTRATION",
      subTitle: "CR_BIRTH_NEW_REG",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-birth/child-details`,
      role: "BND_CEMP"
    },
    {
      title: "CR_STILL_BIRTH_REG",
      subTitle: "CR_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-stillbirth/stillbirth-child-details`,
      role: "BND_CEMP"
    },
    {
      title: "CR_BIRTH_BORN_OUTSIDE",
      subTitle: "CR_BIRTH_BORN_OUTSIDE_DESC",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-bornoutsidebirth/born-outside-child-details`,
      role: "BND_CEMP"
    },
    {
      title: "CR_ABANDONED_BIRTH_REGISTRATION",
      subTitle: "CR_ABANDONED_BIRTH_NEW_REGISTRATION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-abandonedbirth/abandoned-child-details`,
      role: "BND_CEMP"
    },
    {
      title: "CR_NAC_BIRTH",
      subTitle: "CR_NAC_BIRTH_REG",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-nacbirthsearch/nac-download-details`,
      role: "BND_CEMP"
    },
    {
      title: "CR_ADOPTION",
      subTitle: "CR_BIRTH_REG_NEW_ADOPTION",
      img: <FileProtected />,
      link: `/digit-ui/employee/cr/create-adoption`,
      role: "BND_CEMP"
    },
    {
      title: "CR_BIRTH_NAME_INC_CORRECTION",
      subTitle: "CR_BIRTH_NAME_INC_CORRECTION_DESC",
      img: <FileProtected />,
      // link: `${path}/structure-type`,
      role: "BND_CEMP"
    },    

    // BND_CEMP END---------------------------------------------------------------------------------------
    {
      label: t("CR_SEARCH_APPLICATIONS"),
      link: `/digit-ui/employee/cr/search-flow`
      // link: `/digit-ui/employee/cr/search/application`
    },
  ]

  links = links.filter(link => link.role ? checkForEmployee(link.role) : true);


  // const cardMenuData = [
    // {
    //   title: "CR_BIRTH_REG_EMP",
    //   subTitle: "CR_BIRTH_NEW_REG",
    //   img: <FileProtected />,
    //   link: `/digit-ui/employee/cr/create-birth/child-details`,
    //   role: "HOSPITAL_OPERATOR" 
    // },
  //   {
  //     title: "CR_BIRTH_REG_EMP",
  //     subTitle: "CR_BIRTH_NEW_REG",
  //     img: <FileProtected />,
  //     link: `/digit-ui/employee/cr/create-birth/child-details`,
  //     role: "HOSPITAL_APPROVER"
  //   },


    // {
    //   title: "CR_BIRTH_BORN_OUTSIDE",
    //   subTitle: "CR_BIRTH_BORN_OUTSIDE_DESC",
    //   img: <FileProtected />,
    //   link: `/digit-ui/employee/cr/create-bornoutsidebirth/born-outside-child-details`,
    // },
    // {
    //   title: "CR_ABANDONED_BIRTH_REGISTRATION",
    //   subTitle: "CR_ABANDONED_BIRTH_NEW_REGISTRATION",
    //   img: <FileProtected />,
    //   link: `/digit-ui/employee/cr/create-abandonedbirth/abandoned-child-details`,
    // },
    // {
    //   title: "CR_NAC_BIRTH",
    //   subTitle: "CR_NAC_BIRTH_REG",
    //   img: <FileProtected />,
    //   link: `/digit-ui/employee/cr/create-nacbirthsearch/nac-download-details`,
    // },
    // // {
    // //   title: "CR_BIRTH_NAME_INC_CORRECTION",
    // //   subTitle: "CR_BIRTH_NAME_INC_CORRECTION_DESC",
    // //   img: <FileProtected />,
    // //   // link: `${path}/structure-type`,
    // // },
  // ];
  const ClassList = {
    CR_BIRTH_REGISTRATION: "crfilename",
    //  'CR_BIRTH_NEW_REG':  'crfilename',
    CR_BIRTH_ADOPTION: "crfileadoption",
    CR_STILL_BIRTH_REG: "crstillbirthfile",
    CR_BIRTH_BORN_OUTSIDE: "crfile",
    CR_ABANDONED_BIRTH_REGISTRATION: "crfilecorrection",
    CR_BIRTH_NAME_INC_CORRECTION: "crfilecorrection",
    CR_NAC_BIRTH: "crfilecorrection",
    CR_ADOPTION: "crfileadoption",
  };
  return (
    <div>
      <div className="fileText">
        {" "}
        <CardLabel style={{ fontSize: "15px", fontWeight: "400", marginBottom: "-18px" }}>{t("Select Functional Modules")}</CardLabel>
        {/* <h3>Select Functional Modules</h3> */}
      </div>
      <div className="FileFlowWrapper">
        <div className="cardWrapper">
          {links?.map((item, index) =>
            item.link ? (
              <Link to={item.link} key={index}>
                {/* <Link to='trade-lisense'> */}
                <div className={ClassList[item.title]}>
                  <div className="contentMenu">
                    <div className="contentImg">{item.img}</div>
                    <div className="contentText">
                      <h6>{item.title}</h6>
                      <span>{item.subTitle}</span>
                    </div>
                  </div>
                </div>{" "}
              </Link>
            ) : (
              <div className={ClassList[item.title]}>
                <div className="contentMenu">
                  <div className="contentImg">{item.img}</div>
                  <div className="contentText">
                    <h6>{item.title}</h6>
                    <span>{item.subTitle}</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CrFlow;
