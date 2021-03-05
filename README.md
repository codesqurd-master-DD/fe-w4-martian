# fe-w4-martian

![](https://images.theconversation.com/files/96726/original/image-20150930-19533-1by0fu3.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C2000%2C970&q=45&auto=format&w=1356&h=668&fit=crop)

## TODO LIST

### 환경 설정

- express
- webpack
- babel

### MyPromise

- constructor에서 cbList 관리 후 비동기 처리
- then 구현(callback을 받아 처리)

### 마크 와트니와 통신하라

- 기본 HTML, CSS
- 10, 16진법 변환 기능 구현

- 지구, 화성 모듈

  - (발신)입력중인 10진법을 16진법으로 실시간 변환, 보여주기
  - (발신)5초에 한 번씩 송수신기에 변환 한 16진법 문자 전송하기
  - (송신)첫 송신 후 5초 이내로 새로운 문자가 오지 않으면 종료 및 해석하기 활성화
  - (송신) 송수신기가 가르키는 문자 받아적기

- 송수신기 모듈

  - 송수신기 그리기 (canvas)
  - 입력받은 문자 가르키기
  - 화살표 돌리기(가까운 거리 계산)
  - 해당 문자 2초 깜빡이기
