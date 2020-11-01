import React from 'react';
import './alignment-styles.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// NOTE: alignment descriptions are taken from http://easydamus.com/alignment.html

class Alignment extends React.Component {
    state = {
        alignment: 0,
        alignment_text: [
            "A lawful good character acts as a good person is expected or required to act. They combine a commitment to oppose evil with the discipline to fight relentlessly. They tell the truth, keep their word, help those in need, and speak out against injustice. A lawful good character hates to see the guilty go unpunished.",
            "A neutral good character does the best that a good person can do. They are devoted to helping others. They work with kings and magistrates but do not feel beholden to them.",
            "A chaotic good character acts as their conscience directs them with little regard for what others expect of them. They make their own way, but they're kind and benevolent. They believe in goodness and right but have little use for laws and regulations. They hate it when people try to intimidate others and tell them what to do. They follow their own moral compass, which, although good, may not agree with that of society.",
            "A lawful neutral character acts as law, tradition, or a personal code directs them. Order and organization are paramount to them. They may believe in personal order and live by a code or standard, or they may believe in order for all and favor a strong, organized government.",
            "A neutral character does what seems to be a good idea. They don't feel strongly one way or the other when it comes to good vs. evil or law vs. chaos. Most neutral characters exhibit a lack of conviction or bias rather than a commitment to neutrality. Such a character thinks of good as better than evil-after all, they would rather have good neighbors and rulers than evil ones. Still, they're not personally committed to upholding good in any abstract or universal way.",
            "A chaotic neutral character follows their whims. They are an individualist first and last. They value their own liberty but don't strive to protect others' freedom. They avoid authority, resent restrictions, and challenge traditions. A chaotic neutral character does not intentionally disrupt organizations as part of a campaign of anarchy. To do so, they would have to be motivated either by good (and a desire to liberate others) or evil (and a desire to make those different from themself suffer). A chaotic neutral character may be unpredictable, but their behavior is not totally random. They are not as likely to jump off a bridge as to cross it.",
            "A lawful evil villain methodically takes what they want within the limits of their code of conduct without regard for whom it hurts. They care about tradition, loyalty, and order but not about freedom, dignity, or life. They play by the rules but without mercy or compassion. They are comfortable in a hierarchy and would like to rule, but are willing to serve. They are loath to break laws or promises.",
            "A neutral evil villain does whatever they can get away with. They are out for themself, pure and simple. They shed no tears for those they kill, whether for profit, sport, or convenience. They have no love of order and hold no illusion that following laws, traditions, or codes would make them any better or more noble. On the other hand, they don't have the restless nature or love of conflict that a chaotic evil villain has.",
            "A chaotic evil character does whatever their greed, hatred, and lust for destruction drive them to do. They are hot-tempered, vicious, arbitrarily violent, and unpredictable. If they are simply out for whatever they can get, they are ruthless and brutal. If they are committed to the spread of evil and chaos, they are even worse. Thankfully, their plans are haphazard, and any groups they join or form are poorly organized. Typically, chaotic evil people can be made to work together only by force, and their leader lasts only as long as he can thwart attempts to topple or assassinate him."
        ]
    }

    handleChange = e => {
        this.setState({alignment: e.target.value});
    }

    render () {
        return (
        <div class="alignment">
            <h2>STEP 1: CHOOSE AN ALIGNMENT</h2>
            <h3>Your character's alignment influences the moral choices that they make.</h3>
            <FormControl className = 'select'>
        <InputLabel id="demo-simple-select-label">Select Alignment</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.alignment}
          onChange={this.handleChange}
        >
          <MenuItem value={0}>Lawful Good</MenuItem>
          <MenuItem value={1}>Neutral Good</MenuItem>
          <MenuItem value={2}>Chaotic Good</MenuItem>
          <MenuItem value={3}>Lawful Neutral</MenuItem>
          <MenuItem value={4}>True Neutral</MenuItem>
          <MenuItem value={5}>Chaotic Neutral</MenuItem>
          <MenuItem value={6}>Lawful Evil</MenuItem>
          <MenuItem value={7}>Neutral Evil</MenuItem>
          <MenuItem value={8}>Chaotic Evil</MenuItem>
        </Select>
      </FormControl>
        <p class='text'>{this.state.alignment_text[this.state.alignment]}</p>
        </div>
        )
    }
}

export default Alignment;