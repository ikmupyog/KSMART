import React from "react";
import { useQuery } from "react-query";
import { CRNACBirthService } from "../../services/elements/CRNACBIRTH";

const useResistryDownloadNacBirth = ({ filters, config = {} }) =>
  useQuery(
    ["CR_NACSEARCH", ...Object.keys(filters)?.map((e) => filters?.[e])],
    () => CRNACBirthService.CRResistryDownloadBirth(filters?.id, filters?.source),
    {
      ...config,
    }
  );

export default useResistryDownloadNacBirth;
