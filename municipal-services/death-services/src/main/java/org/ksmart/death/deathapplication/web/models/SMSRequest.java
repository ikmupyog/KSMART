package org.ksmart.death.deathapplication.web.models;

import lombok.*;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SMSRequest {

	 private Long mobileNumber;
	    private String message;
}
