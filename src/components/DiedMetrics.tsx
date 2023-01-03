import {default as React} from 'react';
import {churchesMapping} from "./mapps";
import IconInfo from "../icons/info-tooltip.svg";

declare const bootstrap: any;

const DiedMetrics = ({hits, churches, yearsFilter}: any) => {
    const copyContent = (target: any, {year, month, died, name, age, reason, church}: any) => {
        try {
            navigator.clipboard.writeText(`
${churchesMapping.get(church)}
Дата: ${year} ${month} ${died}
Кто умер: ${name}
Возраст: ${age}
${reason ? `Причина смерти: ${reason}` : ''}
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
    }, [hits.length]);

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th></th>
                    {churches.length > 1 && <th>Церковь</th>}
                    {yearsFilter.length !== 1 && <th>Год</th>}
                    <th>Дата</th>
                    <th>Умер</th>
                    <th>Возраст</th>
                    <th>От чего умер</th>
                    <th>Заметки</th>
                </tr>
                </thead>
                <tbody id="list-of-res">
                {
                    hits.map((hit: any, index: number) => {
                        const {church, year, month, died, age, reason, notes, _highlightResult} = hit;
                        return (
                            <tr key={index}>
                                <td><button
                                    className="btn btn-light"
                                    onClick={({target}: any) => copyContent(target, hit)}
                                >Copy</button></td>
                                {churches.length > 1 && <td className="church-td">{churchesMapping.get(church)}</td>}
                                {yearsFilter.length !== 1 && <td>{year}</td>}
                                <td>{died} {month}</td>
                                <td dangerouslySetInnerHTML={{__html: _highlightResult?.name?.value}}></td>
                                <td>{age}</td>
                                <td>{reason}</td>
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

export default DiedMetrics;