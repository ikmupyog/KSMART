package org.ksmart.death.deathapplication.util;

import java.util.List;

public class DeathApplicationUtil {


    public Long setSeqId(List<String> ApplicationNumber) {
        Long seqNoId=null;
        String inputString= ApplicationNumber.get(0);
        String[] seqNoIdArray= inputString.split("-");
        seqNoId = Long.parseLong(seqNoIdArray[3]) ;
        return seqNoId;
    }
    
}
