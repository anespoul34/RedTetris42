import React from 'react'
import PropTypes from 'prop-types'

const Adversaries = (props) => {
  const { spectres } = props

  const spectre = spectres.map((item, i) => (
    <li
      className='player'
      key={i}>
      <span>{item.username}</span>
      <div className='board'>
      {
        item.board.map((line, y) => (
          <div className='line' key={y} >
          {
            line.map((box, x) => {
              const piece = box ? 'Z' : 0
              return <div className={`box ${piece}`} key={x} ></div>
            })
          }
          </div>
        ))
      }
      </div>
    </li>
  ))

  return (
    <div id='spectres'>
      <div id='opponent'>Opponents</div>
      <ul id='spectresList'>{ spectres ? spectre : '' }</ul>
    </div>
  )
}

Adversaries.propTypes = {
  spectres: PropTypes.array,
}

Adversaries.defaultProps = {
  spectres: [],
}

export default Adversaries

