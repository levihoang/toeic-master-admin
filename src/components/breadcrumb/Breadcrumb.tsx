import React from "react";
import moment from 'moment';
import style from './index.module.scss';


const Breadcrumb = ({crumbs, selected}: {crumbs: any, selected: (crumb: any) => void}) => {
  const isLast = (index: number) => {
    return index === crumbs?.length - 1;
  }
  return(
    <>
      <div className="flex">
        <nav className="justify-content-center">
          <ol className={style.breadcrumb}>
            <li
              className={style['breadcrumb-item']}
            >
              <button onClick={() => selected('/category')}>
                Home
              </button>
            </li>
            {
              crumbs?.map((crumb: any, ci: any) => {
                const disabled = isLast(ci) ? 'disabled' : '';
                
                return (
                  <li
                    key={ ci }
                    className={style['breadcrumb-item']}
                  >
                    <button className={ `${style['breadcrumb-link']} ${ disabled ? style['breadcrumb-disabled'] : '' }` } onClick={ () => selected(crumb.url) }>
                      { crumb.name }
                    </button>
                  </li>
                );
              })
            }
          </ol>
        </nav>
      </div>
    </>
  )
}

export default Breadcrumb;