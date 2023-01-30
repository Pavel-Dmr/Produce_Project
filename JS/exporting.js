/*
 Highcharts JS v4.1.8 (2015-08-20)
 Exporting module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (g) {
  var A = g.Chart,
    t = g.addEvent,
    B = g.removeEvent,
    C = HighchartsAdapter.fireEvent,
    j = g.createElement,
    p = g.discardElement,
    v = g.css,
    l = g.merge,
    m = g.each,
    q = g.extend,
    E = g.splat,
    F = Math.max,
    k = document,
    D = window,
    G = g.isTouchDevice,
    H = g.Renderer.prototype.symbols,
    r = g.getOptions(),
    y;
  q(r.lang, {
    printChart: "Print chart",
    downloadPNG: "Download PNG image",
    downloadJPEG: "Download JPEG image",
    downloadPDF: "Download PDF document",
    downloadSVG: "Download SVG vector image",
    contextButtonTitle: "Chart context menu",
  });
  r.navigation = {
    menuStyle: {
      border: "1px solid #A0A0A0",
      background: "#FFFFFF",
      padding: "5px 0",
    },
    menuItemStyle: {
      padding: "0 10px",
      background: "none",
      color: "#303030",
      fontSize: G ? "14px" : "11px",
    },
    menuItemHoverStyle: { background: "#4572A5", color: "#FFFFFF" },
    buttonOptions: {
      symbolFill: "#E0E0E0",
      symbolSize: 14,
      symbolStroke: "#666",
      symbolStrokeWidth: 3,
      symbolX: 12.5,
      symbolY: 10.5,
      align: "right",
      buttonSpacing: 3,
      height: 22,
      theme: { fill: "white", stroke: "none" },
      verticalAlign: "top",
      width: 24,
    },
  };
  r.exporting = {
    type: "image/png",
    url: "http://export.highcharts.com/",
    buttons: {
      contextButton: {
        menuClassName: "highcharts-contextmenu",
        symbol: "menu",
        _titleKey: "contextButtonTitle",
        menuItems: [
          {
            textKey: "printChart",
            onclick: function () {
              this.print();
            },
          },
          { separator: !0 },
          {
            textKey: "downloadPNG",
            onclick: function () {
              this.exportChart();
            },
          },
          {
            textKey: "downloadJPEG",
            onclick: function () {
              this.exportChart({ type: "image/jpeg" });
            },
          },
          {
            textKey: "downloadPDF",
            onclick: function () {
              this.exportChart({ type: "application/pdf" });
            },
          },
          {
            textKey: "downloadSVG",
            onclick: function () {
              this.exportChart({ type: "image/svg+xml" });
            },
          },
        ],
      },
    },
  };
  g.post = function (b, a, e) {
    var c,
      b = j(
        "form",
        l({ method: "post", action: b, enctype: "multipart/form-data" }, e),
        { display: "none" },
        k.body
      );
    for (c in a) j("input", { type: "hidden", name: c, value: a[c] }, null, b);
    b.submit();
    p(b);
  };
  q(A.prototype, {
    sanitizeSVG: function (b) {
      return b
        .replace(/zIndex="[^"]+"/g, "")
        .replace(/isShadow="[^"]+"/g, "")
        .replace(/symbolName="[^"]+"/g, "")
        .replace(/jQuery[0-9]+="[^"]+"/g, "")
        .replace(/url\([^#]+#/g, "url(#")
        .replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ')
        .replace(/ (NS[0-9]+\:)?href=/g, " xlink:href=")
        .replace(/\n/, " ")
        .replace(/<\/svg>.*?$/, "</svg>")
        .replace(
          /(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,
          '$1="rgb($2)" $1-opacity="$3"'
        )
        .replace(/&nbsp;/g, "\u00a0")
        .replace(/&shy;/g, "\u00ad")
        .replace(/<IMG /g, "<image ")
        .replace(/<(\/?)TITLE>/g, "<$1title>")
        .replace(/height=([^" ]+)/g, 'height="$1"')
        .replace(/width=([^" ]+)/g, 'width="$1"')
        .replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>')
        .replace(/ id=([^" >]+)/g, ' id="$1"')
        .replace(/class=([^" >]+)/g, 'class="$1"')
        .replace(/ transform /g, " ")
        .replace(/:(path|rect)/g, "$1")
        .replace(/style="([^"]+)"/g, function (a) {
          return a.toLowerCase();
        });
    },
    getChartHTML: function () {
      return this.container.innerHTML;
    },
    getSVG: function (b) {
      var a = this,
        e,
        c,
        f,
        z,
        h,
        d = l(a.options, b),
        s = d.exporting.allowHTML;
      if (!k.createElementNS)
        k.createElementNS = function (a, b) {
          return k.createElement(b);
        };
      c = j(
        "div",
        null,
        {
          position: "absolute",
          top: "-9999em",
          width: a.chartWidth + "px",
          height: a.chartHeight + "px",
        },
        k.body
      );
      f = a.renderTo.style.width;
      h = a.renderTo.style.height;
      f =
        d.exporting.sourceWidth ||
        d.chart.width ||
        (/px$/.test(f) && parseInt(f, 10)) ||
        600;
      h =
        d.exporting.sourceHeight ||
        d.chart.height ||
        (/px$/.test(h) && parseInt(h, 10)) ||
        400;
      q(d.chart, {
        animation: !1,
        renderTo: c,
        forExport: !s,
        width: f,
        height: h,
      });
      d.exporting.enabled = !1;
      delete d.data;
      d.series = [];
      m(a.series, function (a) {
        z = l(a.options, {
          animation: !1,
          enableMouseTracking: !1,
          showCheckbox: !1,
          visible: a.visible,
        });
        z.isInternal || d.series.push(z);
      });
      b &&
        m(["xAxis", "yAxis"], function (a) {
          m(E(b[a]), function (b, c) {
            d[a][c] = l(d[a][c], b);
          });
        });
      e = new g.Chart(d, a.callback);
      m(["xAxis", "yAxis"], function (b) {
        m(a[b], function (a, c) {
          var d = e[b][c],
            f = a.getExtremes(),
            h = f.userMin,
            f = f.userMax;
          d && (h !== void 0 || f !== void 0) && d.setExtremes(h, f, !0, !1);
        });
      });
      f = e.getChartHTML();
      d = null;
      e.destroy();
      p(c);
      if (s && (c = f.match(/<\/svg>(.*?$)/)))
        (c =
          '<foreignObject x="0" y="0 width="200" height="200"><body xmlns="http://www.w3.org/1999/xhtml">' +
          c[1] +
          "</body></foreignObject>"),
          (f = f.replace("</svg>", c + "</svg>"));
      f = this.sanitizeSVG(f);
      return (f = f
        .replace(/(url\(#highcharts-[0-9]+)&quot;/g, "$1")
        .replace(/&quot;/g, "'"));
    },
    getSVGForExport: function (b, a) {
      var e = this.options.exporting;
      return this.getSVG(
        l({ chart: { borderRadius: 0 } }, e.chartOptions, a, {
          exporting: {
            sourceWidth: (b && b.sourceWidth) || e.sourceWidth,
            sourceHeight: (b && b.sourceHeight) || e.sourceHeight,
          },
        })
      );
    },
    exportChart: function (b, a) {
      var e = this.getSVGForExport(b, a),
        b = l(this.options.exporting, b);
      g.post(
        b.url,
        {
          filename: b.filename || "chart",
          type: b.type,
          width: b.width || 0,
          scale: b.scale || 2,
          svg: e,
        },
        b.formAttributes
      );
    },
    print: function () {
      var b = this,
        a = b.container,
        e = [],
        c = a.parentNode,
        f = k.body,
        g = f.childNodes;
      if (!b.isPrinting)
        (b.isPrinting = !0),
          C(b, "beforePrint"),
          m(g, function (a, b) {
            if (a.nodeType === 1)
              (e[b] = a.style.display), (a.style.display = "none");
          }),
          f.appendChild(a),
          D.focus(),
          D.print(),
          setTimeout(function () {
            c.appendChild(a);
            m(g, function (a, b) {
              if (a.nodeType === 1) a.style.display = e[b];
            });
            b.isPrinting = !1;
            C(b, "afterPrint");
          }, 1e3);
    },
    contextMenu: function (b, a, e, c, f, g, h) {
      var d = this,
        s = d.options.navigation,
        l = s.menuItemStyle,
        n = d.chartWidth,
        o = d.chartHeight,
        k = "cache-" + b,
        i = d[k],
        u = F(f, g),
        w,
        x,
        p,
        r = function (a) {
          d.pointer.inClass(a.target, b) || x();
        };
      if (!i)
        (d[k] = i =
          j(
            "div",
            { className: b },
            { position: "absolute", zIndex: 1e3, padding: u + "px" },
            d.container
          )),
          (w = j(
            "div",
            null,
            q(
              {
                MozBoxShadow: "3px 3px 10px #888",
                WebkitBoxShadow: "3px 3px 10px #888",
                boxShadow: "3px 3px 10px #888",
              },
              s.menuStyle
            ),
            i
          )),
          (x = function () {
            v(i, { display: "none" });
            h && h.setState(0);
            d.openMenu = !1;
          }),
          t(i, "mouseleave", function () {
            p = setTimeout(x, 500);
          }),
          t(i, "mouseenter", function () {
            clearTimeout(p);
          }),
          t(document, "mouseup", r),
          t(d, "destroy", function () {
            B(document, "mouseup", r);
          }),
          m(a, function (a) {
            if (a) {
              var b = a.separator
                ? j("hr", null, null, w)
                : j(
                    "div",
                    {
                      onmouseover: function () {
                        v(this, s.menuItemHoverStyle);
                      },
                      onmouseout: function () {
                        v(this, l);
                      },
                      onclick: function (b) {
                        b.stopPropagation();
                        x();
                        a.onclick && a.onclick.apply(d, arguments);
                      },
                      innerHTML: a.text || d.options.lang[a.textKey],
                    },
                    q({ cursor: "pointer" }, l),
                    w
                  );
              d.exportDivElements.push(b);
            }
          }),
          d.exportDivElements.push(w, i),
          (d.exportMenuWidth = i.offsetWidth),
          (d.exportMenuHeight = i.offsetHeight);
      a = { display: "block" };
      e + d.exportMenuWidth > n
        ? (a.right = n - e - f - u + "px")
        : (a.left = e - u + "px");
      c + g + d.exportMenuHeight > o && h.alignOptions.verticalAlign !== "top"
        ? (a.bottom = o - c - u + "px")
        : (a.top = c + g - u + "px");
      v(i, a);
      d.openMenu = !0;
    },
    addButton: function (b) {
      var a = this,
        e = a.renderer,
        c = l(a.options.navigation.buttonOptions, b),
        f = c.onclick,
        k = c.menuItems,
        h,
        d,
        m = { stroke: c.symbolStroke, fill: c.symbolFill },
        j = c.symbolSize || 12;
      if (!a.btnCount) a.btnCount = 0;
      if (!a.exportDivElements)
        (a.exportDivElements = []), (a.exportSVGElements = []);
      if (c.enabled !== !1) {
        var n = c.theme,
          o = n.states,
          p = o && o.hover,
          o = o && o.select,
          i;
        delete n.states;
        f
          ? (i = function (b) {
              b.stopPropagation();
              f.call(a, b);
            })
          : k &&
            (i = function () {
              a.contextMenu(
                d.menuClassName,
                k,
                d.translateX,
                d.translateY,
                d.width,
                d.height,
                d
              );
              d.setState(2);
            });
        c.text && c.symbol
          ? (n.paddingLeft = g.pick(n.paddingLeft, 25))
          : c.text || q(n, { width: c.width, height: c.height, padding: 0 });
        d = e
          .button(c.text, 0, 0, i, n, p, o)
          .attr({
            title: a.options.lang[c._titleKey],
            "stroke-linecap": "round",
          });
        d.menuClassName = b.menuClassName || "highcharts-menu-" + a.btnCount++;
        c.symbol &&
          (h = e
            .symbol(c.symbol, c.symbolX - j / 2, c.symbolY - j / 2, j, j)
            .attr(q(m, { "stroke-width": c.symbolStrokeWidth || 1, zIndex: 1 }))
            .add(d));
        d.add().align(
          q(c, { width: d.width, x: g.pick(c.x, y) }),
          !0,
          "spacingBox"
        );
        y += (d.width + c.buttonSpacing) * (c.align === "right" ? -1 : 1);
        a.exportSVGElements.push(d, h);
      }
    },
    destroyExport: function (b) {
      var b = b.target,
        a,
        e;
      for (a = 0; a < b.exportSVGElements.length; a++)
        if ((e = b.exportSVGElements[a]))
          (e.onclick = e.ontouchstart = null),
            (b.exportSVGElements[a] = e.destroy());
      for (a = 0; a < b.exportDivElements.length; a++)
        (e = b.exportDivElements[a]),
          B(e, "mouseleave"),
          (b.exportDivElements[a] =
            e.onmouseout =
            e.onmouseover =
            e.ontouchstart =
            e.onclick =
              null),
          p(e);
    },
  });
  H.menu = function (b, a, e, c) {
    return [
      "M",
      b,
      a + 2.5,
      "L",
      b + e,
      a + 2.5,
      "M",
      b,
      a + c / 2 + 0.5,
      "L",
      b + e,
      a + c / 2 + 0.5,
      "M",
      b,
      a + c - 1.5,
      "L",
      b + e,
      a + c - 1.5,
    ];
  };
  A.prototype.callbacks.push(function (b) {
    var a,
      e = b.options.exporting,
      c = e.buttons;
    y = 0;
    if (e.enabled !== !1) {
      for (a in c) b.addButton(c[a]);
      t(b, "destroy", b.destroyExport);
    }
  });
})(Highcharts);