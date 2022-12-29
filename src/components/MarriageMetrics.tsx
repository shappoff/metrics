import {default as React} from 'react';
import {churchesMapping} from "./mapps";
import IconInfo from "../icons/info-tooltip.svg";

declare const bootstrap: any;

const MarriageMetrics = ({hits, churches, yearsFilter}: any) => {
    const copyContent = (target: any, {church, year, month, day, husband, husband_age, wife, wife_age, trustees}: any) => {
        try {
            navigator.clipboard.writeText(`
${churchesMapping.get(church)}
Дата: ${year} ${month} ${day}
Жених: ${husband}
Возраст жениха: ${husband_age}
Невеста: ${wife}
Возраст невесты: ${wife_age}
Попечители: 
${trustees}
            `.trim());
            var tooltip = new bootstrap.Tooltip(target, {title: 'Скопировано', placement: 'right'});
            tooltip.show();
            setTimeout(() => tooltip.dispose(), 300);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    React.useEffect(() => {
        [].forEach.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'), (tooltipTriggerEl: any) => {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        })
    }, []);

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th></th>
                    {churches.length > 1 && <th>Церковь</th>}
                    {yearsFilter.length !== 1 && <th>Год</th>}
                    <th>Дата</th>
                    <th>Жених</th>
                    <th className="age-tr">Его возраст</th>
                    <th>Невеста</th>
                    <th className="age-tr">Ее возраст</th>
                    <th>Кто были попечители</th>
                    <th>Заметки</th>
                </tr>
                </thead>
                <tbody id="list-of-res">
                {
                    hits.map((hit: any, index: number) => {
                        const {church, year, month, day, husband_age, wife_age, notes, _highlightResult} = hit;
                        return (
                            <tr key={index}>
                                <td><button className="btn btn-light" onClick={({target}) => copyContent(target, hit)}>Copy</button></td>
                                {churches.length > 1 && <td className="church-td">{churchesMapping.get(church)}</td>}
                                {yearsFilter.length !== 1 && <td>{year}</td>}
                                <td>{day} {month}</td>
                                <td dangerouslySetInnerHTML={{__html: _highlightResult?.husband?.value}}></td>
                                <td className="age-tr">{husband_age}</td>
                                <td dangerouslySetInnerHTML={{__html: _highlightResult?.wife?.value}}></td>
                                <td className="age-tr">{wife_age}</td>
                                <td dangerouslySetInnerHTML={{__html: _highlightResult?.trustees?.value}}></td>
                                <td className="note-info">{
                                    notes ? <img src={IconInfo} alt={notes} title={notes} data-bs-toggle="tooltip" /> : null
                                }</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </>
    );
}

export default MarriageMetrics;