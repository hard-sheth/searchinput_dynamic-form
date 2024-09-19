import React, { useEffect, useState } from 'react'
import { inputTypesDiff } from './CustomForm'
import { FieldValues, useFieldArray, useForm, UseFormSetValue } from 'react-hook-form';
import { MultiItemForm } from './MultiAddRemove';
import { FaPlus } from 'react-icons/fa';

type arrayFormProps = {
    item: inputTypesDiff,
    setParentValue: UseFormSetValue<FieldValues>,
    resetForm: boolean
}

function ArrayForm({ item, setParentValue, resetForm }: arrayFormProps) {
    if (item.type === 'arrayform') {
        const [update, setUpdate] = useState(false)
        const { control, watch, setValue,reset } = useForm()
        const { fields, append, remove } = useFieldArray({
            control,
            name: item.name, // Use the name of the current array detail
        });
        const myavailableObject: { [key: string]: any } = {}
        for (const nestedFormLable of item.details) {
            myavailableObject[`${nestedFormLable.name}`] = ''
        }

        const createNesteForm = watch();

        /**
         * Update indexed form values
         *
         * @param {number} indexOfForm // which position of form can be updated form value.
         * @param {string} propertyname // name of property which we will update in form.
         * @param {object} details // in object which can update object.
         */
        function formArrayUpdate(
            indexOfForm: number,
            propertyname: string,
            details: object
        ) {
            const detailForm = createNesteForm[indexOfForm];
            if (Object.values(details).length > 0) {
                const myUpdateValue = { ...detailForm, ...details };
                setValue(`${propertyname}.${indexOfForm}`, { ...myUpdateValue });
                setUpdate(true)
            }
        }
        useEffect(() => {
            if (createNesteForm) {
                setParentValue(`${item.name}`, createNesteForm);
            }
            return () => {
                setUpdate(false)
            }
        }, [update])
        useEffect(()=>{
            if (resetForm){
                reset()
            }
        },[resetForm])
        
        return (
            <div>
                <div
                    className={`${item.arrayformclass ? item.arrayformclass : `row mb-2`
                        }`}
                >
                    {/* {allFormData[item.name]} */}
                    {fields.map((field, formIndexArray) => {
                        return (
                            <MultiItemForm
                                key={field.id}
                                update={formArrayUpdate}
                                index={formIndexArray}
                                value={field}
                                details={item.details}
                                formClass={item.arrayformclass}
                                remove={remove}
                                propertyName={item.name}
                                valueofForm={
                                    createNesteForm[item.name] && typeof createNesteForm[item.name][formIndexArray] !== 'undefined' ? createNesteForm[item.name][formIndexArray] : {}
                                }
                            />
                        );
                    })}
                </div>
                <button
                    type="button"
                    className={"btn btn-primary" + ``}
                    onClick={() => {
                        append(myavailableObject)
                        setUpdate(true)
                    }}
                >
                    <FaPlus /> Add
                </button>
            </div>
        )
    }
}
export default ArrayForm

