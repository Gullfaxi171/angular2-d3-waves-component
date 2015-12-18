var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../typings/tsd.d.ts" />
var angular2_1 = require("angular2/angular2");
/** Let's wave */
var draw;
(function (draw) {
    /** Génère un ID unique à cette Wave */
    function generateId() {
        return "Wave" + Math.round(10000 * Math.random());
    }
    var Wave = (function () {
        function Wave() {
            /** L'id unique du Wave */
            this.id = generateId();
            this.makeChart = function () {
                var w = 350;
                var h = 350;
                var vm = this;
                vm.ws = 3;
                /** Le conteneur SVG */
                var svg = d3.select("#" + vm.id).append("svg").attr("width", w).attr("height", h);
                /** Ajouter un point à la carte */
                function setPoint(x, y) {
                    /** Make a rotating dot */
                    /*let circle = svg
                      .append("circle")
                      .attr("cx", x)
                      .attr("cy", y)
                      .attr("r", 10)
                      .attr("fill", "#fff")
                      .attr("stroke", "#000");*/
                    /** Le point qui tourne */
                    var dot = svg
                        .append("circle")
                        .attr("cx", x + 10)
                        .attr("cy", y)
                        .attr("fill", "rgb(" + Math.round(x / 2) % 255 + ", " + Math.round(y / 2) % 255 + ", " + Math.round((x * y) / 4) % 255 + ")")
                        .attr("r", 2);
                    /** La fonction de transition */
                    var tween = function (d, i, a) {
                        return d3.interpolateString("rotate(0, " + x + ", " + y + ")", "rotate(360, " + x + ", " + y + ")");
                    };
                    /** Démarrage de la transition */
                    function firstTransition() {
                        dot
                            .transition()
                            .delay(x + y)
                            .duration(vm.ws * 600)
                            .attrTween("transform", tween)
                            .ease("linear")
                            .each("end", transition);
                    }
                    var i = 0;
                    /** Démarrage de la transition */
                    function transition() {
                        i += 1;
                        dot
                            .transition()
                            .delay(function () {
                            if (i < 5) {
                                return x + y;
                            }
                            else {
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
                for (var i = 0; i < 35; i++) {
                    for (var j = 0; j < 35; j++) {
                        setPoint(11 * i, 11 * j);
                    }
                }
            };
        }
        Wave.prototype.onInit = function () {
        };
        Wave.prototype.afterViewInit = function () {
            var vm = this;
            vm.makeChart();
        };
        Wave = __decorate([
            angular2_1.Component({
                selector: "wave-chart",
                directives: [angular2_1.CORE_DIRECTIVES],
                template: "<div class=\"wave-container\" id=\"{{ id }}\"></div>",
                styleUrls: ["styles.css"]
            }), 
            __metadata('design:paramtypes', [])
        ], Wave);
        return Wave;
    })();
    angular2_1.bootstrap(Wave);
})(draw || (draw = {}));
//# sourceMappingURL=wave.js.map