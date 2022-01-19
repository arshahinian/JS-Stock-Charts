async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=30min&outputsize=12&apikey=3678b5957e6d4a4ebdab035926f5c366');

    let result = await response.json();
    console.log(result);

    const { GME, MSFT, DIS, BNTX } = result;

    const stocks = [GME, MSFT, DIS, BNTX];

    console.log(getCustomArray(stocks));

    var myChart =new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    var myChart2 = new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map( stock2 => stock2.meta.symbol),
            datasets: getCustomArray(stocks)
        }
    });
}
function getCustomArray(myStocks)
{
    let myArray = new Array();
    let priceArray = new Array();
    let colorArray = new Array();

    for(let i = 0; i < myStocks.length;i++)
    {
        let maxHigh = parseFloat(0);
        for(let j = 0;j < myStocks[i].values.length;j++)
        {        
            if (parseFloat(myStocks[i].values[j].high) > parseFloat(maxHigh))
            {
                maxHigh = parseFloat(myStocks[i].values[j].high);
            }
        }
        console.log(maxHigh);
        priceArray.push(parseFloat(maxHigh))
        colorArray.push(getColor(myStocks[i].meta.symbol))
          
    }
    myArray.push({
        label: 'Highest',
        data:  priceArray,
        backgroundColor:  colorArray,
        borderColor: colorArray
        }) 
    return myArray;
}


function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}


main()