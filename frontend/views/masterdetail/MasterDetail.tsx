import { Button } from "@hilla/react-components/Button.js";
import { EmailField } from "@hilla/react-components/EmailField.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Grid, GridDataProviderCallback, GridDataProviderParams } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { Notification } from "@hilla/react-components/Notification.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { useBinder } from "@hilla/react-form";
import Employee from "Frontend/generated/com/example/application/backend/Employee";
import EmployeeModel from "Frontend/generated/com/example/application/backend/EmployeeModel";
import { MasterDetailEndpoint } from "Frontend/generated/endpoints";
import { useEffect, useMemo, useState } from "react";

export default function MasterDetailView() {
    const [selectedItems, setSelectedItems] = useState<Employee[]>([]);

    const { model, submit, field, read, clear } = useBinder(EmployeeModel, {
        onSubmit: async (e) => {
            await MasterDetailEndpoint.saveEmployee(e);
            Notification.show(`Submitted: ${JSON.stringify(e)}`);
        }
    });

    const dataProvider = useMemo(() => async (
        params: GridDataProviderParams<Employee>,
        callback: GridDataProviderCallback<Employee>
    ) => {
        const { page, pageSize } = params;

        const data = await MasterDetailEndpoint.getEmployeesData(
            page * pageSize,
            pageSize,
        );

        callback(data.employees, data.totalSize);
    }, []);

    return (
        <>
            <SplitLayout className="splitLayout">
                <div className="splitLayout__gridTable">
                    <Grid
                        id="grid"
                        className="splitLayout"
                        theme="no-border"
                        dataProvider={dataProvider}
                        selectedItems={selectedItems}
                        onActiveItemChanged={({ detail: { value } }) => {
                            if (value) {
                                read(value);
                            } else {
                                clear();
                            }
                            setSelectedItems(value ? [value] : []);
                        }}
                    >
                        <GridColumn path="firstname" />
                        <GridColumn path="lastname" />
                        <GridColumn path="email" />
                    </Grid>
                </div>
                <div id="editor-layout">
                    <FormLayout>
                        <TextField label="First name" {...field(model.firstname)} />
                        <TextField label="Last name" {...field(model.lastname)} />
                        <EmailField label="Email" {...field(model.email)} />
                    </FormLayout>
                    <HorizontalLayout id="button-layout" theme="spacing">
                        <Button theme="tertiary" slot="">Reset</Button>
                        <Button theme="primary" onClick={submit}>Save</Button>
                    </HorizontalLayout>
                </div >
            </SplitLayout >
            <Notification duration={5000} id="notification" />
        </>
    );
}
