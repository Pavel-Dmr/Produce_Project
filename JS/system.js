function Login_Popup() {
  var popupX = document.body.offsetWidth / 2 - 450 / 2;
  //&nbsp;만들 팝업창 좌우 크기의 1/2 만큼 보정값으로 빼주었음

  var popupY = window.screen.height / 2 - 700 / 2;
  //&nbsp;만들 팝업창 상하 크기의 1/2 만큼 보정값으로 빼주었음

  window.open(
    "login.html",
    "pagename",
    "resizable,height=700,width=450,status=no,toolbar=no,scrollbar=no,location=no,left=" +
      popupX +
      ",top=" +
      popupY
  );
  return false;
}

// 상단 nav 탭메뉴 마우스오버,아웃

var tabLinks = document.querySelectorAll(".tablinks");
var tabContent = document.querySelectorAll(".nav_sub");

tabLinks.forEach(function (el) {
  el.addEventListener("mouseover", openTabs);
  el.addEventListener("mouseout", closeTabs);
});

$(".tab_news").click(function (el) {
  let temp_btn = document.querySelectorAll(".tab_news");
  let temp_data = document.querySelectorAll(".tab_area_news");

  var btnTarget = el.currentTarget;
  var tabs = btnTarget.dataset.tabs;

  temp_btn.forEach(function (el) {
    el.classList.remove("current");
  });

  temp_data.forEach(function (el) {
    el.classList.remove("current");
  });

  document.querySelector("#" + tabs).classList.add("current");

  btnTarget.classList.add("current");
});

function openTabs(el) {
  var btnTarget = el.currentTarget;
  var tabs = btnTarget.dataset.tabs;

  tabContent.forEach(function (el) {
    el.classList.remove("active");
  });

  tabLinks.forEach(function (el) {
    el.classList.remove("active");
  });

  document.querySelector("#" + tabs).classList.add("active");

  btnTarget.classList.add("active");
}

function closeTabs(el) {
  tabContent.forEach(function (el) {
    el.classList.remove("active");
  });

  tabLinks.forEach(function (el) {
    el.classList.remove("active");
  });
}

$(".tab_price").click(function (el) {
  let temp_btn = document.querySelectorAll(".tab_price");
  let temp_data = document.querySelectorAll(".tab_area");
  let i = $(".tab_price").index(this);

  console.log(i);

  if (i <= 4) {
    for (let x = 0; x <= 4; x++) {
      temp_btn.item(x).classList.remove("current");
      temp_data.item(x).classList.remove("current");
    }
    temp_btn.item(i).classList.add("current");
    temp_data.item(i).classList.add("current");
  } else {
    for (let x = 5; x <= 9; x++) {
      temp_btn.item(x).classList.remove("current");
      temp_data.item(x).classList.remove("current");
    }
    temp_btn.item(i).classList.add("current");
    temp_data.item(i).classList.add("current");
  }
});

const today = new Date();

const year = today.getFullYear();

const month_def = today.getMonth() + 1;
const day_def = today.getDate() - 1;

const month = month_def / 10 > 1 ? month_def : "0" + month_def;

const day = day_def / 10 > 1 ? day_def : "0" + day_def;

const today_user = "&p_regday=" + year + "-" + month + "-" + day;

const user_key =
  "&p_returntype=json&p_cert_key=f82108b6-095a-45db-8f5f-64b65a16bdc2&p_cert_id=dlrkdals227@gmail.com";

const API_URL_Test =
  "http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=02&p_country_code=1101&p_convert_kg_yn=N&p_item_category_code=200&&p_regday=2022-07-05&p_returntype=json&p_cert_key=f82108b6-095a-45db-8f5f-64b65a16bdc2&p_cert_id=dlrkdals227@gmail.com";

function Whole_Chart(p_productno, who) {
  let API =
    "http://www.kamis.or.kr/service/price/xml.do?action=recentlyPriceTrendList&p_productno=" +
    p_productno +
    today_user +
    user_key;

  $.ajax({
    url: "/api/get",
    dataType: "json",
    type: "GET",
    data: { data: API },
    success: function (api) {
      if (api) {
        for (let i = 0; i < api.result.price.length; i++) {
          let item = api.result.price[i];

          let item_list = [
            item.yyyy,
            item.d40,
            item.d30,
            item.d20,
            item.d10,
            item.d0,
          ];

          if (item.yyyy !== "2022") {
            continue;
          }
          if (who == "whole") {
            Create_Chart(
              item_list[0],
              item_list[1],
              item_list[2],
              item_list[3],
              item_list[4],
              item_list[5]
            );
          } else {
            Create_Chart2(
              item_list[0],
              item_list[1],
              item_list[2],
              item_list[3],
              item_list[4],
              item_list[5]
            );
          }
        }
      }
    },
  });
}

function Whole_Support() {
  const product_code = [100, 200, 300, 400, 600];

  for (let p = 0; p < product_code.length; p++) {
    const API_URL_Whole =
      "http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=02&p_country_code=1101&p_convert_kg_yn=N&p_item_category_code=" +
      product_code[p] +
      today_user +
      user_key;

    // 이벤트 메서드
    //Ajax GET Method TEST
    $.ajax({
      url: "/api/get",
      dataType: "json",
      type: "GET",
      data: { data: API_URL_Whole },
      success: function (api) {
        if (api) {
          const parent_tag = document.querySelectorAll("#whole");

          for (let x = 0; x < parent_tag.length; x++) {
            for (let i = 0; i < api.result.data.item.length; i++) {
              let item = api.result.data.item[i];

              let item_list = [
                item.item_name, // 이름
                item.kind_name, // 품질원산지
                item.rank, // 품질
                item.dpr1, // 금일
                item.dpr2, // 전일
                item.dpr5, // 1개월
                item.dpr6, // 1년
              ];

              if (item.dpr1 == "-") {
                continue;
              }

              let element_tr = document.createElement("tr");
              element_tr.style.cursor = "pointer";
              element_tr.setAttribute(
                "onclick",
                "Whole_Chart(" + item.item_code + ",'whole')"
              );
              element_tr.classList.add("tr_whole");

              let once = true;
              for (let y = 1; y < item_list.length; y++) {
                let element_td = document.createElement("td");

                //이름 품질 원산지 혼합
                if (y == 1) {
                  element_td.innerText = item_list[0] + "/" + item_list[1];
                  element_td.style.textAlign = "left";
                  element_td.style.paddingLeft = "10px";
                }
                // 등가율
                else if (y == 2) {
                  element_td.style.textAlign = "center";
                  element_td.innerText = item_list[y];
                } else if (y == 4 && once) {
                  let temp3 = parseInt(item_list[3].replace(",", ""));
                  let temp4 = parseInt(item_list[4].replace(",", ""));

                  element_td.innerText =
                    Math.round(((temp3 - temp4) / temp4) * 1000) / 10 + "%";

                  if (item_list[3] == "-" || item_list[4] == "-") {
                    element_td.innerText = "-";
                  }
                  once = false;
                  element_td.style.textAlign = "center";
                  y = 3;
                } else {
                  element_td.innerText = item_list[y];
                }
                element_tr.append(element_td);
                parent_tag.item(p).append(element_tr);
              }
            }
          }
        }
      },
    });
  }
}

function Retail_Support() {
  const product_code = [100, 200, 300, 400, 600];

  for (let p = 0; p < product_code.length; p++) {
    const API_URL_Whole =
      "http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_country_code=1101&p_convert_kg_yn=N&p_item_category_code=" +
      product_code[p] +
      today_user +
      user_key;

    // 이벤트 메서드

    //Ajax GET Method TEST
    $.ajax({
      url: "/api/get",
      dataType: "json",
      type: "GET",
      data: { data: API_URL_Whole },
      success: function (api) {
        if (api) {
          const parent_tag = document.querySelectorAll("#retail");

          for (let x = 0; x < parent_tag.length; x++) {
            for (let i = 0; i < api.result.data.item.length; i++) {
              let item = api.result.data.item[i];
              let item_list = [
                item.item_name, // 이름
                item.kind_name, // 품질원산지
                item.rank, // 품질
                item.dpr1, // 금일
                item.dpr2, // 전일
                item.dpr5, // 1개월
                item.dpr6, // 1년
              ];

              if (item.dpr1 == "-") {
                continue;
              }
              let element_tr = document.createElement("tr");
              element_tr.style.cursor = "pointer";
              element_tr.setAttribute(
                "onclick",
                "Whole_Chart(" + item.item_code + ",'retail')"
              );
              element_tr.classList.add("tr_retail");

              let once = true;
              for (let y = 1; y < item_list.length; y++) {
                let element_td = document.createElement("td");

                //이름 품질 원산지 혼합
                if (y == 1) {
                  element_td.innerText = item_list[0] + "/" + item_list[1];
                  element_td.style.textAlign = "left";
                  element_td.style.paddingLeft = "10px";
                }
                // 등가율
                else if (y == 2) {
                  element_td.style.textAlign = "center";
                  element_td.innerText = item_list[y];
                } else if (y == 4 && once) {
                  let temp3 = parseInt(item_list[3].replace(",", ""));
                  let temp4 = parseInt(item_list[4].replace(",", ""));

                  element_td.innerText =
                    Math.round(((temp3 - temp4) / temp4) * 1000) / 10 + "%";
                  once = false;
                  if (item_list[3] == "-" || item_list[4] == "-") {
                    element_td.innerText = "-";
                  }
                  element_td.style.textAlign = "center";
                  y = 3;
                } else {
                  element_td.innerText = item_list[y];
                }
                element_tr.append(element_td);
                parent_tag.item(p).append(element_tr);
              }
            }
          }
        }
      },
    });
  }
}

function Time_Set() {
  let time_set = document.querySelectorAll(".time_set");

  for (let x = 0; x < time_set.length; x++) {
    time_set.item(x).style.whiteSpace = "nowrap";
    time_set.item(x).innerText = "가격(" + month + "." + day + ")";
  }
}
Whole_Support();
Retail_Support();
Time_Set();

//test line ================================

$(document).ready(function () {
  $("#retail").click(function () {
    var get = "GET METHOD CALL";

    //Ajax GET Method TEST
    $.ajax({
      url: "/api/get",
      dataType: "json",
      type: "GET",
      data: { data: get },
      success: function (api) {
        if (api) {
          console.log(api.result.data.item[0]);
        }
      },
    });
  });
});
