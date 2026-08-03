let data = document.getElementById('data');
let time = document.getElementById('time');

function zero_first_format(value)
{
    if (value < 10)
    {
        value='0'+value;
    }
    return value;
}

function dates()
{
    var current_datetime = new Date();
    var day = zero_first_format(current_datetime.getDate());
    var month = zero_first_format(current_datetime.getMonth()+1);
    var year = current_datetime.getFullYear();

    data.innerHTML = day+"."+month+"."+year;
}

function times()
{
    var current_datetime = new Date();
    var hours = zero_first_format(current_datetime.getHours());
    var minutes = zero_first_format(current_datetime.getMinutes());
    var seconds = zero_first_format(current_datetime.getSeconds());

    time.innerHTML = hours+":"+minutes;
}

setInterval(function () {
    dates();
    times();
}, 1000);