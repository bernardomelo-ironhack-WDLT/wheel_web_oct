var padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = 600 - padding.left - padding.right,
  h = 600 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 21,
  oldpick = [],
  turn = false;
color = d3.scale.category20();

var data = [
  {
    label: 'André G.',
    value: 1,
    question: 'André G.',
    pic: 'Alunos_Apr23/snorlax.png',
  }, // padding
  { label: 'Bruno C.', value: 2, question: 'Bruno C.', pic: 'Alunos_Apr23/meowth.png' }, //font-family
  {
    label: 'Bruno M.',
    value: 3,
    question: 'Bruno M.',
    pic: 'Alunos_Apr23/chikorita.png',
  }, //color
  {
    label: 'Carol V.',
    value: 4,
    question: 'Carol V.',
    pic: 'Alunos_Apr23/squirtle.png',
  }, //font-weight
  {
    label: 'Daniel R.',
    value: 5,
    question: 'Daniel R.',
    pic: 'Alunos_Apr23/psyduck.png',
  }, //font-size
  {
    label: 'Fares Q.',
    value: 6,
    question: 'Fares Q.',
    pic: 'Alunos_Apr23/magikarp.png',
  }, //nesting
  { label: 'Inception', value: 7, question: "Teacher's choice", pic: 'Alunos_Apr23/ash.png' },
  {
    label: 'Guilherme S.',
    value: 8,
    question: 'Guilherme S.',
    pic: 'Alunos_Apr23/bulbasaur.png',
  }, //sans-serif
  {
    label: 'Jakob B.',
    value: 9,
    question: 'Jakob B.',
    pic: 'Alunos_Apr23/charmander.png',
  },
  {
    label: 'João C.',
    value: 10,
    question: 'João C.',
    pic: 'Alunos_Apr23/tangela.png',
  },
  {
    label: 'João S.',
    value: 11,
    question: 'João S.',
    pic: 'Alunos_Apr23/psyduck.png',
  },
  {
    label: 'João V.',
    value: 12,
    question: 'João V.',
    pic: 'Alunos_Apr23/snorlax.png',
  },
  {
    label: 'Marcelo',
    value: 13,
    question: 'Marcelo',
    pic: 'Alunos_Apr23/meowth.png',
  },
  {
    label: 'Mariana C.',
    value: 14,
    question: 'Mariana C.',
    pic: 'Alunos_Apr23/eevee.png',
  },
  {
    label: 'Miguel M.',
    value: 15,
    question: 'Miguel M.',
    pic: 'Alunos_Apr23/bulbasaur.png',
  },
  {
    label: 'Vasco G.',
    value: 16,
    question: 'Vasco G.',
    pic: 'Alunos_Apr23/eevee.png',
  }
];
var svg = d3
  .select('#chart')
  .append('svg')
  .data([data])
  .attr('width', w + padding.left + padding.right)
  .attr('height', h + padding.top + padding.bottom);
var container = svg
  .append('g')
  .attr('class', 'chartholder')
  .attr('transform', 'translate(' + (w / 2 + padding.left) + ',' + (h / 2 + padding.top) + ')');
var vis = container.append('g');

var pie = d3.layout
  .pie()
  .sort(null)
  .value(function (d) {
    return 1;
  });
var arc = d3.svg.arc().outerRadius(r);
var arcs = vis.selectAll('g.slice').data(pie).enter().append('g').attr('class', 'slice');

arcs
  .append('path')
  .attr('fill', function (d, i) {
    return color(i);
  })
  .attr('d', function (d) {
    return arc(d);
  });
arcs
  .append('text')
  .attr('transform', function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return (
      'rotate(' + ((d.angle * 180) / Math.PI - 90) + ')translate(' + (d.outerRadius - 10) + ')'
    );
  })
  .attr('text-anchor', 'end')
  .text(function (d, i) {
    return data[i].label;
  });
container.on('click', spin);
function spin(d) {
  turn = true;
  container.on('click', null);
  if (oldpick.length == data.length) {
    console.log('done');
    container.on('click', null);
    return;
  }
  song.play();
  var ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    /* Velocidade rng */
    rng = Math.floor(Math.random() * 2880 + 360);

  /* VELOCIDADE DA ROTACAO */
  rotation = Math.round(rng / ps) * ps * 2;

  picked = Math.round(data.length - (rotation % 360) / ps);
  picked = picked >= data.length ? picked % data.length : picked;
  if (oldpick.indexOf(picked) !== -1) {
    d3.select(this).call(spin);
    return;
  } else {
    oldpick.push(picked);
  }
  rotation += 90 - Math.round(ps / 2);
  vis
    .transition()
    /* DURACAO DO TEMPO DELA RODANDO */
    .duration(7500)
    .attrTween('transform', rotTween)
    .each('end', function () {
      d3.select('.slice:nth-child(' + (picked + 1) + ') path').attr('fill', '#111');
      d3.select('#question h1').text(data[picked].question);
      d3.select('#pic img').attr('src', data[picked].pic);
      oldrotation = rotation;
      console.log(data[picked].label);
      console.log([picked]);
      console.log(data[picked].pic);
      turn = false;
      console.log(turn);
      container.on('click', spin);
    });
}
//arrow
svg
  .append('g')
  .attr('transform', 'translate(' + (w + 200) + ',' + (h / 2 + padding.top) + ')')
  .append('path')
  .attr('d', 'M-' + r * 0.8 + ',0L0,' + r * 0.4 + 'L0,-' + r * 0.4 + 'Z')
  .style({ fill: 'red' });
//draw spin circle
/* container.append("circle")
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .attr("r", 60)
                    .style({"fill":"white","cursor":"pointer"}); */
container
  .append('image')
  .attr('xlink:href', '/assets/ironhackpt-removebg-preview.png')
  .attr('x', -110)
  .attr('y', -110)
  .attr('width', 225)
  .attr('height', 225)
  .style({ cursor: 'pointer' });

function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return 'rotate(' + i(t) + ')';
  };
}

function getRandomNumbers() {
  var array = new Uint16Array(1000);
  var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
  if (window.hasOwnProperty('crypto') && typeof window.crypto.getRandomValues === 'function') {
    window.crypto.getRandomValues(array);
    console.log('works');
  } else {
    for (var i = 0; i < 1000; i++) {
      array[i] = Math.floor(Math.random() * 100000) + 1;
    }
  }
  return array;
}
