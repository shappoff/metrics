declare const ymaps: any;

const fillColor = '#ff000c';// Цвет заливки.
const fillColor2 = '#0022ff';// Цвет заливки.
const strokeColor = '#fff';// Цвет обводки.
const opacity = 0.2;// Общая прозрачность (как для заливки, так и для обводки).
const strokeWidth = 1;// Ширина линии.
const strokeStyle = 'shortdash';// Стиль обводки.

const options = {
    fillColor,
    strokeColor,
    opacity,
    strokeWidth,
    strokeStyle
};
const optionsHata = {
    fillColor,
    strokeColor,
    strokeWidth
};
const circleRadius = (zoom: number) => {
    let radius = 0;
    switch (zoom) {
        case 19:
            radius = 1;
            break;
        case 18:
            radius = 2;
            break;
        case 17:
            radius = 3;
            break;
        case 16:
            radius = 7;
            break;
        case 15:
            radius = 12;
            break;
        case 14:
            radius = 20;
            break;
        case 13:
            radius = 60;
            break;
        case 12:
            radius = 100;
            break;
        case 11:
            radius = 200;
            break;
        case 10:
            radius = 300;
            break;
        case 9:
            radius = 800;
            break;
        case 8:
            radius = 1000;
            break;
        case 7:
            radius = 1500;
            break;
        default:
            radius = 3;

    }
    return radius;
};

ymaps.ready(init);

function init() {

    const myMap = new ymaps.Map("map", {
        zoom: 8,
        center: [53.902287, 27.561824],
        controls: ['rulerControl','typeSelector', 'zoomControl', 'fullscreenControl']
    }, {
        minZoom: 7,
        // Зададим ограниченную область прямоугольником,
        // примерно описывающим Санкт-Петербург.
                restrictMapArea: [
                    [53.945213, 28.793050],
                    [54.510718, 29.866930]
                ]
    });

    const createHomeDot = ({coords, balloonContentHeader, balloonContentBody, balloonContentFooter, hintContent}: any, color: string) => {
        if (!coords) {
            return;
        }
        return new ymaps.Circle([
            [+coords[1], +coords[0]],
            circleRadius(myMap.getZoom())
        ], {
            balloonContentHeader,
            balloonContentBody,
            balloonContentFooter,
            open: true,
            hintContent
        }, {...optionsHata, ...{fillColor: color}});
    }


    const prikhodyArr: Array<any> = [
        createHomeDot({
            coords: [54.304933, 29.448255],
            balloonContentHeader: 'balloonContentHeader',
            balloonContentBody: 'balloonContentBody',
            balloonContentFooter: 'balloonContentFooter',
            hintContent: 'hintContent'
        }, '#FF0000AA')

    ];

    prikhodyArr.forEach((hata: any, index: number) => {
        myMap.geoObjects.add(hata);
    });

    myMap.events.add('boundschange', function (event: any) {
        const newZoom = event.get('newZoom');
        const radius = circleRadius(newZoom);
        console.log('newZoom', newZoom);
        prikhodyArr.forEach((circle: any) => circle.geometry.setRadius(radius));
    });
}