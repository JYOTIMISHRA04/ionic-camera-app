import { IonActionSheet } from '@ionic/react';

const UIActionSheet = ({ onExport }: any) => {
    return (
        <>
            <IonActionSheet
                trigger="open-action-sheet"
                header="Export to"
                buttons={[
                    {
                        text: 'JPG',
                        role: 'destructive',
                        data: {
                            action: 'delete',
                        },
                        handler: (e: any) => onExport(e, '.jpg')


                    },
                    {
                        text: 'PNG',
                        data: {
                            action: 'share',
                        },
                        handler: (e: any) => onExport(e, '.png')
                    },
                    {
                        text: 'PDF',
                        role: 'cancel',
                        data: {
                            action: 'cancel',
                        },
                        handler: (e: any) => onExport(e, '.pdf')

                    },
                ] as any}
            ></IonActionSheet>
        </>
    );
}
export default UIActionSheet