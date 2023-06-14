using {db} from '../db/data-model';

service SalesOrdersSample @(path: 'api') {
    type SelectOptions {
        Values   : many {
            Low  : String;
        };
        Ranges   : many {
            Low  : String;
            High : String;
        }
    }

    action RefreshForecastItems(SalesOrderID : SelectOptions, SalesDocumentType : SelectOptions, SalesOrganization : SelectOptions) returns array of String;
}
