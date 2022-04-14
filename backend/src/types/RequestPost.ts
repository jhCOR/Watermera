export enum RequestStatus{
	UnderReview, // 요청을 받은 직후
	Accepted, // 요청이 확인되고 테스트가 진행될 예정인 경우
	Sampling, // 샘플을 구하는 중인 경우
	Analysing, // 샘플을 채취하고 분석중인 경우
	Finalising, // 결과 레포트 생성중인 경우
	Finished, // 결과 레포트가 완성된 경우
	Declined // 요청이 거절된 경우
}

export default interface RequestPost{
	reqid: string;
	time: Date;
	location: string;
	requestor: string;
	status: RequestStatus;
	resid: string | null;
	note: string;
}