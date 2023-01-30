
<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=random&height=300&section=header&text=농수산물%20시세%20사이트&fontSize=90" />
<h2>📚 Tech Stack 📚</h2>
  <p>✨ PlatForms & Languages ✨</p>
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
  <br>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=Chart.js&logoColor=white" />
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
  
  [2. 설치 및 실행 방법](#2장-설치-및-실행-방법)
  
  [3. 시스템 구성도](#3장-시스템-구성도)
  
  [4. 구현](#4장-구현)
  
  [5. 이슈](#5장-이슈)
 
  
  ---
  
  # 1장 개요
    at KAMIS 한국 농수산식품유통공사에서 제공하는 OpenAPI기반 농수산유통정보을 기반으로 제작된 HTML 사이트입니다.
    OpenAPI을 사용하여, 정보를 가공해, 소비자에게 필요한 정보를 제공하기 위해 제작되었습니다.
  
  # 2장 설치 및 실행 방법
      터미널에서 npm start 입력
      웹에서 localhost:80으로 노드 서버에 접속
      
      node.js 버전 : 8.11.0
      OpenAPI : [농산물유통정보:::KAMIS](https://www.kamis.or.kr/customer/reference/openapi_list.do)
      
      node.js 라이브러리 목록
          nodemon
          Express Server
          chart.js
          cors
          request 2.88.2
          
          
          
    
  # 3장 시스템 구성도
  ![농수산물_01](https://user-images.githubusercontent.com/104084926/215573276-e587883b-fd67-44f7-9335-169b28d70275.jpg)
![농수산물_02](https://user-images.githubusercontent.com/104084926/215573282-146b457d-63a6-4587-ab5f-2745cbf06df7.jpg)

  
  # 4장 구현
  
  ### 직접 구현한 기능
  
  1. 웹 디자인
     - 탭 메뉴
     - 소형 게시판
     - 로그인 팝업
    
  2. 농수산물의 시세 조회 및 차트 제공
     - 표 제공 (품목, 단위(전일 기준) , 등락률, 전일, 1개월전, 1년전) 
     - ajax 통신으로 OpenAPI 자료 조회, 가공
     - chart.js로 날짜별 정보 제공 (40일전,30일전,20일전,10일전,당일 - 시세 흐름을 제공)
         
### 제공된 기능
    
  1. 슬라이더
      - swiper

  2. node.js 익스프레스 서버
   
    
  # 5장 이슈
  ### 교차 출처 리소스 공유 (CORS) 이슈
     [이슈] OpenAPI 정보 제공 서버와 localhost 포트가 달라, CORS 정책에 의해서 데이터 전달을 받지 못합니다.
     [해결] Node.js Express Server 설치 후 Express Server로 1차적으로 필요한 데이터을 받은 후, 다시 로컬로 보내서 데이터 가공

 




  
  
