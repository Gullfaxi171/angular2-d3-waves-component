/// <reference path="../../../typings/tsd.d.ts" />
import {Component, bootstrap, CORE_DIRECTIVES} from "angular2/angular2";

/** Let's wave */
module draw {

  /** Génère un ID unique à cette Wave */
  function generateId(): string {
    return "Wave" + Math.round(10000 * Math.random());
  }

  @Component({
    selector: "wave-chart",
    directives: [CORE_DIRECTIVES],
    template: `<div class="wave-container" id="{{ id }}"></div>`,
    styleUrls: ["styles.css"]
  })
  class Wave {
    /** L'id unique du Wave */
    public id: string = generateId();
    /** Vitesse des vagues */
    ws: number;

    makeChart: () => void = function() {
      const w: number = 350;
      const h: number = 350;

      let vm: Wave = this;
      vm.ws = 3;

      /** Le conteneur SVG */
      let svg = d3.select("#" + vm.id).append("svg").attr("width", w).attr("height", h);


      /** Ajouter un point à la carte */
      function setPoint(x: number, y: number) {
        /** Make a rotating dot */
        /*let circle = svg
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 10)
          .attr("fill", "#fff")
          .attr("stroke", "#000");*/

        /** Le point qui tourne */
        let dot = svg
          .append("circle")
          .attr("cx", x + 10)
          .attr("cy", y)
          .attr("fill", "rgb(" + Math.round(x/2) % 255 + ", " + Math.round(y/2) % 255 + ", " + Math.round((x * y)/4) % 255 + ")")
          .attr("r", 2);

        /** La fonction de transition */
        let tween = function (d, i, a) {
            return d3.interpolateString("rotate(0, " + x + ", " + y + ")", "rotate(360, " + x + ", " + y + ")");
        }

        /** Démarrage de la transition */
        function firstTransition() {
          dot
            .transition()
            .delay(x+y)
            .duration(vm.ws * 600)
            .attrTween("transform", tween)
            .ease("linear")
            .each("end", transition);
        }

        let i = 0;

        /** Démarrage de la transition */
        function transition() {

          i += 1;
          dot
            .transition()
            .delay(function() {
              if(i<5) {
                return x+y;
              } else {
                return 0;
              }
            })
            .duration(vm.ws * 600)
            .attrTween("transform", tween)
            .ease("linear")
            .each("end", transition);
        }

        firstTransition();
      }

      for(let i=0;i<35;i++) {
        for(let j=0;j<35;j++) {
          setPoint(11 * i, 11 * j);
        }
      }

    }

    constructor() {

    }

    onInit() {

    }

    afterViewInit() {
      var vm: Wave = this;
      vm.makeChart();
    }
  }
  bootstrap(Wave);
}
