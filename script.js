var padding = {top:20, right:40, bottom:0, left:0},
            w = 600 - padding.left - padding.right,
            h = 600 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 27,
            oldpick = [],
            /* newArray = [],
            novoArray = [],
            pair3 = [],
            pair4 = [],
            pair5 = [],
            pair6 = [],
            pair7 = [],
            pair8 = [],
            pair9 = [],
            pair10 = [],
            pair11 = [],
            pair12 = [],
            pair13 = [],
            pair14 = [], */
            turn = false;
            color = d3.scale.category20();//category20c()
            //randomNumbers = getRandomNumbers();
        //http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results
        var data = [
                    {"label":"Alexandre A.",  "value":1,  "question":"Alexandre A."}, // padding
                    {"label":"André L.",  "value":2,  "question":"André L."}, //font-family
                    {"label":"Assebe K.",  "value":3,  "question":"Assebe K."}, //color
                    {"label":"Caio M.",  "value":4,  "question":"Caio M."}, //font-weight
                    {"label":"Caroline K.",  "value":5,  "question":"Caroline K."}, //font-size
                    {"label":"Duarte F.",  "value":6,  "question":"Duarte F."}, //background-color
                    {"label":"Déborah L.",  "value":7,  "question":"Déborah L."}, //nesting
                    {"label":"Erika G.",  "value":8,  "question":"Erika G."}, //bottom
                    {"label":"Eveline C.",  "value":9,  "question":"Eveline C."}, //sans-serif
                    {"label":"Farid C.", "value":10, "question":"Farid C."},
                    {"label":"Francisco P.", "value":11, "question":"Francisco P."},
                    {"label":"Gabriel G.", "value":12, "question":"Gabriel G."},
                    {"label":"Joana G.", "value":13, "question":"Joana G."},
                    {"label":"José L.", "value":14, "question":"José L."},
                    {"label":"João C.", "value":15, "question":"João C."},
                    {"label":"João R.", "value":16, "question":"João R."},
                    {"label":"Maria C.", "value":17, "question":"Maria C."},
                    {"label":"Mariana F.", "value":18, "question":"Mariana F."},
                    {"label":"Marisha D.", "value":19, "question":"Marisha D."},
                    {"label":"Miguel J.", "value":20, "question":"Miguel J."},
                    {"label":"Miguel L.", "value":21, "question":"Miguel L."},
                    {"label":"Paulo C.", "value":22, "question":"Paulo C."},
                    {"label":"Pedro L.", "value":23, "question":"Pedro L."},
                    {"label":"Rafaela U.", "value":24, "question":"Rafaela U."},
                    {"label":"Tiago R.", "value":25, "question":"Tiago R."},
                    {"label":"Tomás B.", "value":26, "question":"Tomás B."},
                    {"label":"Vanessa V.", "value":27, "question":"Vanessa V."}
        ];
        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);
        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
        var vis = container
            .append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);
        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            
        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });
        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return data[i].label;
            });
        container.on("click", spin);
        function spin(d){
            turn = true;
            container.on("click", null);
            //all slices have been seen, all done
            console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                console.log("done");
                container.on("click", null);
                return;
            }
            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 /* Velocidade rng */
                 rng      = Math.floor((Math.random() * 1440) + 360);
                 
            /* VELOCIDADE DA ROTACAO */
            rotation = (Math.round(rng / ps) * ps * 2);
            
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;
            if(oldpick.indexOf(picked) !== -1){
                d3.select(this).call(spin);
                return;
            } else {
                oldpick.push(picked)
                /* if(oldpick.length > 2){
                    newArray.push(picked)
                } else if(newArray.length == 2) {
                    pair3.push(picked) */
                    /* newArray = []; */
                    /* if(newArray.length === 2) {
                        newArray = pair4;
                        newArray = [];
                    } */
                /* } else if(pair3.length > 2){
                    novoArray.push(picked)
                } */ /* else if(pair3.length === 2){
                    pair4 = pair3;
                    pair3 = [];
                } else if(pair4.length === 2){
                    pair5 = pair4;
                    pair4 = [];
                } else if(pair5.length === 2){
                    pair6 = pair5;
                    pair5 = [];
                } else if(pair6.length === 2){
                    pair7 = pair6;
                    pair6 = [];
                } else if(pair7.length === 2){
                    pair8 = pair7;
                    pair7 = [];
                } */
            }            
            rotation += 270 - Math.round(ps/2);
            vis.transition()
            /* DURACAO DO TEMPO DELA RODANDO */
                .duration(12000)
                .attrTween("transform", rotTween)
                .each("end", function(){
                    //mark question as seen
                    d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                        .attr("fill", "#111");
                    //populate question
                    d3.select("#question h1")
                        .text(data[picked].label);
                    oldrotation = rotation;
                    /* if (oldpick.length > 0) { */
                        /* console.log(data[oldpick[0]].label); */
                    
                    /* d3.select('#pair1 p')
                        .text(data[oldpick[0]].label)
                        if(oldpick.length > 1) {
                    d3.select('#pair2 p')
                        .text(data[oldpick[1]].label);
                    } if(oldpick.length > 2) {
                    d3.select('#pair3 p')
                        .text(data[oldpick[2]].label);
                    } if(oldpick.length > 3) {
                    d3.select('#pair4 p')
                    .text(data[oldpick[3]].label);
                    } if(oldpick.length > 4) {
                    d3.select('#pair5 p')
                    .text(data[oldpick[4]].label);
                    } if(oldpick.length > 5) {
                    d3.select('#pair6 p')
                    .text(data[oldpick[5]].label);
                    } if(oldpick.length > 6) {
                    d3.select('#pair7 p')
                    .text(data[oldpick[6]].label);
                    } if(oldpick.length > 7) {
                    d3.select('#pair8 p')
                    .text(data[oldpick[7]].label);
                    } if(oldpick.length > 8) {
                    d3.select('#pair9 p')
                    .text(data[oldpick[8]].label);
                    } if(oldpick.length > 9) {
                    d3.select('#pair10 p')
                    .text(data[oldpick[9]].label);
                    } if(oldpick.length > 10) {
                    d3.select('#pair11 p')
                    .text(data[oldpick[10]].label);
                    } if(oldpick.length > 11) {
                    d3.select('#pair12 p')
                    .text(data[oldpick[11]].label);
                    } if(oldpick.length > 12) {
                    d3.select('#pair13 p')
                    .text(data[oldpick[12]].label);
                    } if(oldpick.length > 13) {
                    d3.select('#pair14 p')
                    .text(data[oldpick[13]].label);
                    } if(oldpick.length > 14) {
                    d3.select('#pair15 p')
                    .text(data[oldpick[14]].label);
                    } if(oldpick.length > 15) {
                    d3.select('#pair16 p')
                    .text(data[oldpick[15]].label);
                    } if(oldpick.length > 16) {
                    d3.select('#pair17 p')
                    .text(data[oldpick[16]].label);
                    } if(oldpick.length > 17) {
                    d3.select('#pair18 p')
                    .text(data[oldpick[17]].label);
                    } if(oldpick.length > 18) {
                    d3.select('#pair19 p')
                    .text(data[oldpick[18]].label);
                    } if(oldpick.length > 19) {
                    d3.select('#pair20 p')
                    .text(data[oldpick[19]].label);
                    } if(oldpick.length > 20) {
                    d3.select('#pair21 p')
                    .text(data[oldpick[20]].label);
                    } if(oldpick.length > 21) {
                    d3.select('#pair22 p')
                    .text(data[oldpick[21]].label);
                    } if(oldpick.length > 22) {
                    d3.select('#pair23 p')
                    .text(data[oldpick[22]].label);
                    } if(oldpick.length > 23) {
                    d3.select('#pair24 p')
                    .text(data[oldpick[23]].label);
                    } if(oldpick.length > 24) {
                    d3.select('#pair25 p')
                    .text(data[oldpick[24]].label);
                    } if(oldpick.length > 25) {
                    d3.select('#pair26 p')
                    .text(data[oldpick[25]].label);
                    } if(oldpick.length > 26) {
                    d3.select('#pair27 p')
                    .text(data[oldpick[26]].label);
                    } 
                }*/
                    /* Get the result value from object "data" */
                    /* console.log(data[picked])
                    console.log(oldpick[0])
                    console.log(oldpick[1])
                    console.log(oldpick[2])
                    console.log(oldpick[3]) */
                    console.log(data[picked].label)
                    console.log([picked])
                    
                    /* console.log(data[picked]) */
                    /* console.log(data[oldpick]) */
                    /* console.log(data[oldpick[0]])
                    console.log(data[picked])
                    console.log(oldpick)
                    console.log([oldpick[1]])
                    console.log([oldpick[2]])
                    console.log([oldpick[2]]) */
                    /* console.log(data) */
                    /* console.log(newArray)
                    console.log(novoArray)
                    console.log(pair3)
                    console.log(pair4)
                    console.log(pair5)
                    console.log(pair6)
                    console.log(pair7)
                    console.log(pair8) */
                    turn = false;
                    console.log(turn);
                    /* Comment the below line for restrict spin to sngle time */
                    container.on("click", spin);
                })
        }
        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + 50) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            /* .attr("d", "M-" + (r*.20) + ",0L0," + (r*.1) + "L0,-" + (r*.1) + "Z") */
            .style({"fill":"red"});
        //draw spin circle
        /* container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({"fill":"white","cursor":"pointer"}); */
        container.append("image")
            .attr("xlink:href", "ironhackpt-removebg-preview.png")
            .attr("x", -110)
            .attr("y", -110)
            .attr("width", 225)
            .attr("height", 225)
            .style({"cursor":"pointer"});
        //spin text
        /* container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style({"font-weight":"bold", "font-size":"30px"}); */
        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }

        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }
            return array;
        }