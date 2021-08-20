export default function ReportTable(props) {

    if (props.reports.length === 0) {
        return <h2>No Cookie Stands Available</h2>
    }
    const headers = ['Location', ...props.hours, 'Totals'];

    return (
        <table>
            <HeaderRow headerValues={headers} />

            <tbody>
                {props.reports.map(report => {
                    return <ReportRow key={report.id} report={report} />;
                })}
            </tbody>

            <FooterRow reports={props.reports} />

        </table>
    );
}

function HeaderRow({ headerValues }) {
    return (
        <thead>
            <tr>
                {headerValues.map((header, index) => {
                    return <th key={index}>{header}</th>;
                })}
            </tr>
        </thead>
    );
}

function ReportRow({ report }) {

    const total = report.hourly_sales.reduce((sum, value) => sum + value);

    const values = [report.location, ...report.hourly_sales, total];

    return (

        <tr>
            {values.map((value, i) => <td key={i}>{value}</td>)}
        </tr>
    );
}

function FooterRow({ reports }) {

    const cellValues = ['Totals'];

    let megaTotal = 0;

    for (let i in reports[0].hourly_sales) {

        let hourlyTotal = 0;

        for (let report of reports) {
            hourlyTotal += report.hourly_sales[i];
        }

        cellValues.push(hourlyTotal);

        megaTotal += hourlyTotal;
    }

    cellValues.push(megaTotal);

    return (
        <tfoot>
            <tr>
                {cellValues.map((value, index) => {
                    return <th key={index}>{value}</th>;
                })}
            </tr>
        </tfoot>
    );
}
