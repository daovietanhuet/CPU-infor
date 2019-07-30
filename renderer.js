// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const si= require('systeminformation');

function createElement(id, title, info, data) {
    let div = document.createElement("DIV");
    div.setAttribute("id", id);      
    document.body.appendChild(div);

    let child = "";
    for (let ele in info) {
        if(data[ele])
            child = child + `<br/><div style="width: 200px; float: left"><b>${info[ele]}:   </b></div> <div style="float: left"> ${JSON.stringify(data[ele])} </div>`
    }
    document.getElementById(id).innerHTML = `<br/>-----${title}-----` + child + '<br/>';
}

si.cpu(function(data) {
    let info = {
        manufacturer : 'Nhà sản xuất',
        brand: 'Loại',
        speed: 'Tốc độ (GHz)',
        cores: 'Nhân',
        physicalCores: 'Nhân vật lý',
        processors: 'Chip',
        cache: 'Cache'
    }
    createElement('cpu-info', 'CPU Information', info, data)

    si.cpuCurrentspeed(function(data) {
        let info = {
           avg: 'Tốc độ trung bình'
        }
        createElement('cpu-stage', 'CPU Current Stage', info, data)

        si.cpuTemperature(function(data) {
            let info = {
               main: 'Nhiệt độ main'
            }
            createElement('cpu-temp', 'CPU Temperature', info, data)
        })
    })
})

si.mem(data => {
    let info = {
        total: 'Tổng dung lượng',
        free: 'Dung lượng trống',
        used: 'Dung lượng đã dùng',
        active: 'Dung lượng hoạt động',
        swaptotal: 'Bộ nhớ đệm'
    }
    createElement('mem-info','Memory Information', info, data)
})

si.battery(data => {
    let info = {
        hasbattery : 'Có pin',
        cyclecount : 'Số lần sạc',
        ischarging : 'Đang sạc',
        maxcapacity	: 'Dung lượng max',
        currentcapacity	: 'Dung lượng hiện tại',
        percent	: 'Tỉ lệ sạc',
        timeremaining : 'Thời gian còn lại',
        type : 'Loại',
        model : 'Model',
        manufacturer : 'Nhà sản xuất',
        serial : 'Seri'
    }
    createElement('bat-info','Battery Information', info, data)
})

si.osInfo(data => {
    let info = {
        platform: 'Hệ điều hành',
        release: 'Phiên bản',
        serial: 'Seri',
        build: 'Build'
    }
    createElement('os-info','OS Information', info, data)
})

si.networkInterfaces(data => {
    let info = {
        iface: 'Interface',
        ifaceName: 'Tên mạng',	
        ip4: 'IPV4',
        ip6: 'IPV6',
        mac: 'MAC',
        internal: 'Internal',	
        virtual	: 'Virtual',
        type: 'Loại',
        duplex: 'Duplex',
        speed: 'Tốc độ'
    }
    for(let i = 0; i < 5; i++) {
        createElement(`net-info-${i}`, `Net Information ${i}`, info, data[i])
    }
})

si.wifiNetworks(data => {
    let info = {
        ssid : 'SSID',
        bssid : 'BSSID',
        mode : 'Chế độ',
        channel : 'Kênh',
        frequency : 'Tần số',
        signalLevel : 'Mức tín hiệu',
        quality : 'Chất lượng',
        security : 'Bảo mật',
        wpaFlags : 'Wpa Flags',
        rsnFlags : 'Rsn Flags'
    }
    for(let i = 0; i < 5; i++) {
        createElement(`wifi-info-${i}`, `Wifi Information ${i}`, info, data[i])
    }
})