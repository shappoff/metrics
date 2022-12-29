import {default as React} from 'react';
import {churchesMapping} from "./mapps";
import IconInfo from '../icons/info-tooltip.svg';

declare const bootstrap: any;
const BornMetrics = ({hits,  churches, yearsFilter}: any) => {

    const copyContent = (target: any, {year, month, born, church, name, parants, godparents}: any) => {
        try {
            navigator.clipboard.writeText(`
${churchesMapping.get(church)}
Дата: ${year} ${month} ${born}
Имя родившегося: ${name}
Родители: ${parants}
Крестные: ${godparents}
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
                    <th className="born-name-tr">Родился</th>
                    <th>Родители</th>
                    <th>Восприемники</th>
                    <th>Заметки</th>
                </tr>
                </thead>
                <tbody id="list-of-res">
                    {
                        hits.map((hits: any, index: number) => {
                            const {church, year, month, born, notes, _highlightResult} = hits;
                            return (
                                <tr key={index}>
                                    <td>
                                        <button
                                            className="btn btn-light"
                                            onClick={({target}: any) => copyContent(target, hits)}
                                        >Copy</button>
                                    </td>
                                    {churches.length > 1 && <td className="church-td">{churchesMapping.get(church)}</td>}
                                    {yearsFilter.length !== 1 && <td>{year}</td>}
                                    <td>{born} {month}</td>
                                    <td className="born-name-tr" dangerouslySetInnerHTML={{__html: _highlightResult?.name?.value}}></td>
                                    <td dangerouslySetInnerHTML={{__html: _highlightResult?.parants?.value}}></td>
                                    <td dangerouslySetInnerHTML={{__html: _highlightResult?.godparents?.value}}></td>
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

export default BornMetrics;
