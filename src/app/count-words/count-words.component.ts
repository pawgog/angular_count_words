import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-count-words',
  templateUrl: './count-words.component.html',
  styleUrls: ['./count-words.component.scss']
})
export class CountWordsComponent implements OnInit {
  checkText;
  canvas;
  ctx;

  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.checkText = this.formBuilder.group({
      countText: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(checkText) {
    let sentence = checkText.countText;
    let sentenceArray = sentence.toLocaleLowerCase().split(" ").sort();
    let barColor = [];
    let wordsResult = [];
    let countResult = [];

    let randomColor = function() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    };
    
    let counter = 1;
    for (let i = 0; i <= sentenceArray.length; i++) {
      let specWords = /\b(a|an|and|the)\b/gi.test(sentenceArray[i])
      let specChart = /[\.,-\/#!$%\^&\*;:{}=\-_`~()]/gi.test(sentenceArray[i])
      if (specWords == false && specChart == false) {
        if (sentenceArray[i] != sentenceArray[i + 1]) {
          wordsResult.push(sentenceArray[i]);
          countResult.push(counter);
          barColor.push(randomColor());
          counter = 1;
        } else {
          counter++;
        }
      }
    }
    this.canvas = document.getElementById('resultChart');
    this.ctx = this.canvas.getContext('2d');
    let resultChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: wordsResult,
          datasets: [{
            backgroundColor: barColor,
            data: countResult
        }]
      },
      options: {
        display:true,
        scales: {
          yAxes: [{
              stacked: true,
              ticks: {
                min: 0,
                stepSize: 1
              }
          }]
        },
        legend: false,
        title: {
          display: true,
          text: 'Calculate how many times each word is repeated'
        } 
      }
    });


    this.checkText.reset();
  }

}
