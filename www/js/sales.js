
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
    var monthNumbers = [];
    var range = [];
    var calendarPos = today.getMonth() - 6 < 0 ? 12 + today.getMonth() - 6 : today.getMonth() - 6 ;
    var year = today.getMonth() - 6 < 0 ? today.getFullYear() - 1 : today.getFullYear();
    
    for(let i = 0; i < 6; i++) {
        
        if(calendarPos + 1 > 11) {
            
            calendarPos = 0;
            year++;
            
        } else {
            
            calendarPos++;
            
        }
        
        monthNumbers.push(calendarPos + 1);
        labels.push(months[calendarPos]);
        range.push({month: calendarPos + 1, year: year});
        
    }
    
    loadChart(labels, loadData(range, monthNumbers));
    
    document.getElementById('add-button').addEventListener('click', function() { window.location.href = 'new-product.html'; }, false);
    document.getElementById('return-button').addEventListener('click', function() { window.location.href = 'menu.html'; }, false);
    
    
    
});

function loadData(range, monthNumbers) {
    
    var result = [];
    
    $.ajax({

        url: 'http://vps3647.publiccloud.com.br:82/sales.php',
        method: 'get',
        data: {
            mode: 1,
            range: [
                {month: range[0].month, year: range[0].year}, 
                {month: range[range.length - 1].month, year: range[range.length - 1].year}
            ]
        },
        async: false

    }).done(function(data) {

        data = $.parseJSON(data);
        
        for(var i = 0; i < data.length; i++) {
            
            result.push({month: data[i].month, amount: data[i].amount});
            
        }

    }).fail(function() {

        alert('Erro ao carregar gráfico. Tente novamente mais tarde.');

    });

    return formatData(result, monthNumbers);
    
}

function formatData(data, monthNumbers) {
    
    var formattedData = [];
    
    for(let i = 0; i < monthNumbers.length; i++) {
        
        let isPresent = false;
        
        for(let j = 0; j < data.length; j++) {
            
            if(parseInt(data[j].month) === monthNumbers[i]) {

                isPresent = true;
                formattedData.push(data[j].amount);
                
            }
            
        }
        
        if(!isPresent) {

            formattedData.push(0);

        }
        
    }
    
    return formattedData;
    
}

function loadChart(labels, sales) {
    
    var ctx = document.getElementById("chart");
    
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                
                    backgroundColor: 'rgba(255, 150, 150, 0.5)',
                    borderColor: 'rgba(255, 150, 150, 1)',
                    data: sales,
                    label: 'Vendas'
                
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
    
}