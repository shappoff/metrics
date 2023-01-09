import {CSSProperties, default as React} from 'react';
import Select from 'react-select';

const {
    applicationID, adminAPIKey
} = env;

import BornMetrics from "./BornMetrics";
import MarriageMetrics from "./MarriageMetrics";
import DiedMetrics from "./DiedMetrics";

const algoliasearch = require("algoliasearch");

const client = algoliasearch(applicationID, adminAPIKey);

export interface ItemOption {
    readonly value: string;
    readonly label: string;
    readonly uezd: string;
}

const listOfChurches: ItemOption[] = [
    { value: 'molyavka', label: 'Молявковская Михайловская церковь', uezd: 'sennenskiy'},
    { value: 'sloveny', label: 'Словенинская Петропавловская церковь', uezd: 'sennenskiy'},
    { value: 'bobr', label: 'Бобрская святителя Николая церковь', uezd: 'sennenskiy'},
    { value: 'nizgolovo', label: 'Низголовская Иоанно-Предчетинская церковь', uezd: 'lepelskiy' },
    { value: 'usaya', label: 'Усайская Покрова Пресвятой Богородицы церковь', uezd: 'lepelskiy' },
    { value: 'hotino', label: 'Хотинская Святого Иосифа Обручника церковь', uezd: 'lepelskiy' },
];

const splitListOfChurches = (listOfChurches: Array<ItemOption>) => {
    const lepelskiy: Array<ItemOption> = [];
    const sennenskiy: Array<ItemOption> = [];
    listOfChurches.forEach(({value, label, uezd}) => {
        if (uezd === 'lepelskiy') {
            lepelskiy.push({value, label, uezd});
        }
        if (uezd === 'sennenskiy') {
            sennenskiy.push({value, label, uezd});
        }
    });
    return [
        {
            label: 'Сенненский уезд',
            options: sennenskiy
        },
        {
            label: 'Лепельский уезд',
            options: lepelskiy
        }
    ] as Array<GroupedOption>;
};

export interface GroupedOption {
    readonly label: string;
    readonly options: readonly ItemOption[];
}

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const groupBadgeStyles: CSSProperties = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = (data: GroupedOption) => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

const FindMetrics = () => {
    const [value, setValue] = React.useState<string>('');
    const [yearsFilter, setYearsFilter] = React.useState<Array<string>>([]);
    const [churches, setChurches] = React.useState<Array<string>>(['molyavka']);
    const [metricType, setMetricType] = React.useState<string>('born');

    const [hits, setHits] = React.useState<Array<any>>([]);
    const [facets, setFacets] = React.useState<any>({});
    const [currentAlgoliaIndex, setCurrentAlgoliaIndex] = React.useState(client.initIndex('born'));

    React.useEffect(() => {
        setCurrentAlgoliaIndex(client.initIndex(metricType));
    }, [metricType]);

    const searchHandler = ({target}: any) => {
        setValue(target.value);
    }

    const keysHandler = (e: any) => {
        if (e.which == 27) {
            setValue('');
            setHits([]);
        }
    };

    const churchHandler = (e: any) => {
        setHits([]);
        setChurches(e.map(({value}: any) => value));
    }

    const metricTypeRadioHandler = ({currentTarget}: any) => {
        setHits([]);
        setMetricType(currentTarget.value);
    }

    React.useEffect(() => {
        currentAlgoliaIndex.search('', {
            hitsPerPage: 0,
            facets: ["*"],
            facetFilters: [
                [...churches.map((year) => `church:${year}`)],
            ]
        })
            .then(({facets}: any) => {
                setYearsFilter(Object.keys(facets.year) as Array<string>);
                setFacets(facets);
            });
    }, [churches]);

    React.useEffect(() => {
        value.length && currentAlgoliaIndex.search(value, {
            facetFilters: [
                [...churches.map((year) => `church:${year}`)],
                [...yearsFilter.map((year) => `year:${year}`)]
            ]
        })
            .then(({hits, facets}: any) => {
                setHits(hits);
            });
    }, [currentAlgoliaIndex, yearsFilter, value]);

    const yearClickHandler = (e: any) => {
        if (e.target.checked) {
            setYearsFilter([...yearsFilter, e.target.value])
        } else {
            setYearsFilter(yearsFilter.filter((item: any) => item !== e.target.value));
        }
    };

    return (
        <>
            <Select<ItemOption, true, GroupedOption>
                defaultValue={listOfChurches.filter(({uezd}: any) => uezd === 'sennenskiy')}
                isMulti
                options={splitListOfChurches(listOfChurches)}
                formatGroupLabel={formatGroupLabel}
                onChange={churchHandler}
            />
            <div className="type-table">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" defaultChecked type="radio" name="type" id="born" value="born" onChange={metricTypeRadioHandler} />
                    <label className="form-check-label" htmlFor="born">О рождении</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" id="marriage" value="marriage" onChange={metricTypeRadioHandler} />
                    <label className="form-check-label" htmlFor="marriage">О бракосочетавшихся</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" id="died" value="died" onChange={metricTypeRadioHandler} />
                    <label className="form-check-label" htmlFor="died">О умерших</label>
                </div>
            </div>

            <div className="years-facets">
                {
                    facets && facets.year && Object.keys(facets.year).map((year, index) =>
                        <div key={index + 'facet'} className="form-check form-check-inline">
                            <input
                                defaultChecked
                                onChange={yearClickHandler}
                                value={year} id={index + ''}
                                className="form-check-input" type="checkbox" />
                            <label className="form-check-label" htmlFor={index + ''}>{year}</label>
                        </div>
                    )
                }
            </div>
            <input autoFocus onInput={searchHandler} onChange={keysHandler} type="text" value={value} id="input"/>
            {
                hits.length && metricType === 'born' ? <BornMetrics hits={hits} churches={churches} yearsFilter={yearsFilter} /> : ''
            }
            {
                hits.length && metricType === 'marriage' ? <MarriageMetrics hits={hits} churches={churches} yearsFilter={yearsFilter} /> : ''
            }
            {
                hits.length && metricType === 'died' ? <DiedMetrics hits={hits} churches={churches} yearsFilter={yearsFilter} /> : ''
            }

        </>
    );
};

export default FindMetrics;