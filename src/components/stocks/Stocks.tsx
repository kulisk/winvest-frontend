import React, {FC, useEffect} from 'react';
import {useActions} from '../../hooks/useActions';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import Stock from '../stock/Stock';
import '../../styles/common.css';

const Stocks: FC = () => {
    const {stocks, error, loading} = useTypedSelector(state => state.stocks)
    const {search} = useTypedSelector(state => state.search)

    const {fetchStocks} = useActions()

    useEffect(() => {
        fetchStocks()
    }, [])

    if (loading)
        return <h1 className="technical-message">Идет загрузка...</h1>

    if (error)
        return <h1 className="technical-message">Ошибка при загрузке акций</h1>

    return (
        <>{stocks.filter((stock) => {
            if (search == '') return true;
            return stock.shortname.indexOf(search) == 0
                || stock.fullname.indexOf(search) == 0
        }).map((stock) => <Stock key={stock.id}
                                 id={stock.id}
                                 fullname={stock.fullname}
                                 price={stock.price}
                                 currency={stock.currency}
                                 change={stock.change} owned={stock.owned} quantity={stock.quantity}
                                 shortname={stock.shortname}/>)}</>
    );
};

export default Stocks;
