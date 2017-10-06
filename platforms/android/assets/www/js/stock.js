
'use strict';

var months = [
    'Jan', 
    'Fev', 
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
];

$(document).ready(function() {
    
    var today = new Date();
    var labels = [];
    var calendarPos = today.getMonth() - 6 < 0 ? 12 + today.getMonth() - 6 : today.getMonth() - 6 ;
    var year = today.getMonth() - 6 < 0 ? today.getFullYear() - 1 : today.getFullYear();
    
    for(let i = 0; i < 6; i++) {
        
        if(calendarPos + 1 > 11) {
            
            calendarPos = 0;
            year++;
            
        } else {
            
            calendarPos++;
            
        }
        
        labels.push(months[calendarPos]);
        
    }
    
    document.getElementById('add-button').addEventListener('click', function() { window.location.href = 'new-product.html'; }, false);
    document.getElementById('return-button').addEventListener('click', function() { window.location.href = 'menu.html'; }, false);
    
    var ctx = document.getElementById("chart");
    
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                
                    backgroundColor: 'rgba(255, 150, 150, 0.5)',
                    borderColor: 'rgba(255, 150, 150, 1)',
                    data: [2, 156, 44, 7, 12, 33],
                    label: 'Vendas'
                
                },
                {
                
                    backgroundColor: 'rgba(150, 150, 255, 0.5)',
                    borderColor: 'rgba(150, 150, 255, 1)',
                    data: [5, 45, 3, 102, 40, 12],
                    label: 'Estoque'
                
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                        
                    ticks: {
                        beginAtZero: true
                    }
                    
                }]
            },
            title: {
                display: true,
                fontFamily: 'Bebas Neue',
                fontSize: 27,
                text: 'Visualização geral'
            }
        }
    });
    
});