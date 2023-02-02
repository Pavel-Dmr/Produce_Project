
<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=random&height=300&section=header&text=농수산물%20시세%20사이트&fontSize=90" />
<h2>📚 Tech Stack 📚</h2>
  <p>✨ PlatForms & Languages ✨</p>
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
  <br>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white" />
  <br>
  <br>
   <p>🎁 Framework 🎁</p>
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=Chart.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white" />
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=Nodemon&logoColor=white" />
  
  <br>
  <br>
  <p>🔍 API 🔍</p>
  <img src="https://img.shields.io/badge/OpenAPI-6BA539?style=flat&logo=OpenAPI Initiative&logoColor=white" />
  <br>
  <br>
  <p>🛠 Tools 🛠</p> 
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white" />
  <br>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white" />
  <br>
  <br>
  <p>🎨 SNS & Portfolio 🎨 </p>
  <img src="https://img.shields.io/badge/Gmail-EA4335?style=flat&logo=Gmail&logoColor=white" />
  <img src="https://img.shields.io/badge/Portfolio-56B366?style=flat&logo=ProtonVPN&logoColor=white" />
  
  <br>
  <br>
  <h2>📜 목차 📜</h2>
</div>  

  [1. 개요](#1장-개요)
  
  [2. 목적](#2장-목적)
  
  [3. 설치 및 실행 방법](#3장-설치-및-실행-방법)
  
  [4. 시스템 구성도](#4장-시스템-구성도)
  
  [5. 구현](#5장-구현)
  
  [6. 이슈](#6장-이슈)
 
  
  ---
  
  # 1장 개요
    - OpenAPI을 실제로 HTTP로 호출 해보고 , OpenAPI 서버와 HTTP 클라이언트 서버 요청,응답을 설계
  
  # 2장 목적
  	(1) 배경
	- at농수산물식품유통공사가 제공하는 OpenAPI를 통해서, 소비자에게 합리적이고 올바른 소비을 위해서 농수산물의 시세 및 정보을 제공하는 사이트 제작
	
	(2) 사용자
	- 합리적인 소비을 원하는 소비자, 중도매인
	
	(3) 개발 목표
	- 일련의 농수산물 정보 데이터을 소비자가 필요로 하는 데이터로써 가공하고, 클라이언트 View에 정보 전달의 목적으로 적절하게 디자인 및 노출
	  	
	

  
  # 3장 설치 및 실행 방법
      터미널에서 npm start 입력
      웹에서 localhost:80으로 노드 서버에 접속
      
      node.js 버전 : 8.11.0
      OpenAPI : [농산물유통정보:::KAMIS](https://www.kamis.or.kr/customer/reference/openapi_list.do)
      
      node.js 프레임워크 목록
          nodemon
          Express Server
          chart.js
          cors
          request 2.88.2
          
          
          
    
  # 4장 시스템 구성도
  ![농수산물_01](https://user-images.githubusercontent.com/104084926/215573276-e587883b-fd67-44f7-9335-169b28d70275.jpg)
  ![농수산물_02](https://user-images.githubusercontent.com/104084926/215573282-146b457d-63a6-4587-ab5f-2745cbf06df7.jpg)

  
  # 5장 구현
  
  - 중도매인 , 소비자을 위한 시세 제공
  - 전일 대비 등락율 , 이전 날짜의 가격 조회
  - 시세 그래프 제공
  - 시세 이외에 농수산물에 대한 정보나 소식 제공
   
    
  # 6장 이슈
  ### "교차 출처 리소스 공유 (CORS) 이슈" 
    [상황]
    
    - OpenAPI 서버에 특정 데이터을 요청하면, HTTP 클라이언트 서버에 데이터을 받을수가 없음
    
    [문제]
    
    - 자바스크립트에서의 요청은 기본적으로 서로 다른 도메인에 대한 요청을 보안상 제한합니다. 브라우저는 기본적으로 하나의 서버 연결만 허용합니다.(주로 자신의 서버)
    - 고로, OpenAPI 서버와 클라이언트 서버 포트가 달라, CORS 정책에 의해서 데이터 전달을 받지 못합니다.
    
    [해결]
    - Express 프레임워크 설치 후, 클라이언트와 포트가 같은 프록시 서버을 만듭니다.
    - 프록시 서버는 브라우저가 아니기떄문에, CORS의 제약을 받지 않습니다.
    - 프록시 서버에서 OpenAPI 서버로 Json 정보를 요청하고 응답받습니다. 후에 프록시 서버에서 다시 브라우저로 해당 정보를 전달합니다
   
![code](https://user-images.githubusercontent.com/104084926/216386978-8d3d3051-758e-46d8-b376-4a9c72455f95.png)


 




  
  
