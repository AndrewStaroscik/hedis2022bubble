<script>
  // nothing
</script>

<p>
  The responsibility for providing the data to the NCQA falls on each individual health insurance plan. Plans report rates for the measures listed above. The NCQA then uses the information to rate each plan using a <a href='https://reportcards.ncqa.org/health-plans'>5-star rating system</a>.
</p>
<p>
  Reporting the data is an annual obligation for all plans. Plans are financially incentivized to participate because plans that receive higher star ratings are eligible for higher reimbursement rates from some of the programs administered by CMS. Since the ratings are public, plans that score higher may also benefit by improving retention rates of existing plan enrollees and by helping to attract new enrollees. 
</p><p>
  The data for calculating the final ratings are drawn from a number of sources, including claims data created for billing purposes, information included in individual patients' electronic health records,  an NCQA-based review of a health plan’s quality process, and patient surveys such as the <a href='https://www.ahrq.gov/cahps/about-cahps/index.html'>Consumer Assessment of Healthcare Providers and Systems (CAHPS)</a>, and the <a href='https://www.hosonline.org/'>Medicare Health Outcomes Survey (HOS)</a>
</p><p>
  The measures included in the final ratings change yearly as CMS's priorities change and new gaps in care are identified.  This forces plans to be attentive and nimble in their capacity to collect the necessary data every year.
</p><p>
NCQA uses a pre-defined process to aggregate data from each individual measure a set of metrics used to calculate the final 5-star ratings. Different performance metrics received different weighting in the final calculations. Outcome measures are given the highest weights.  Patient experience is given half the weight of the outcome measures, and process measures are given the lowest weight. 
</p><p>
The star system uses a relative scale based on percentile rankings of all participating plans:
</p>
<ul>
<li>5-stars top 10% of plans</li>
<li>4-stars above 66% and below 90%, top third of plans</li>
<li>3-stars 33% to 66%, middle third of plans</li>
<li>2-stars 10% to 33%, lower third of plans</li>
<li>1-star bottom 10% of plans</li>
</ul>
<p>
Bonuses ratings that can raise a plan's star rating are also given by NCQA for consistent reporting. 
</p><p>
A detailed list of <a href='https://www.ncqa.org/wp-content/uploads/2021/12/HEDIS-MY-2022-Measure-Descriptions.pdf'>the measures</a> and <a href='https://www.ncqa.org/wp-content/uploads/2022/07/2022-HPR-Methodology_Updated_7.29.2022.pdf'>the methodology</a> used to calculate the ratings are published by NCQA every year. 
</p>
<h3>About the visualization</h3>
<p>
Data for the chart is drawn from the individual measure descriptions on the NCQAs website, and from the final and from the <a href='https://www.ncqa.org/wp-content/uploads/2021/12/HEDIS-MY-2022-Measure-Descriptions.pdf'>2022 measure descriptions</a>.
</p><p>
The three-letter code on each bubble is the code used by NCQA for the measure with the following exceptions: </p>
<ul>
<li>When a code is used for more than one measure, an additional one to two-letter designation has been appended to the end of the code</li>
<li>The codes used for the patient experience measures were created for this visualization. These codes do not have any basis in the official HEDIS system because NCQA does not use the three-letter code system for the patient experience measures. These custom codes are sued to help distinguish the measures from each other and to add consistency to their visual representations in the graph. </li>
</ul>
<p>
The chart was generated using <a href='https://d3js.org/'>D3</a> and the <a href='https://svelte.dev/'>svelte javascript framework</a>.
</p>

<style>
   p, h1, h2, h3{
    max-width: 600px;
    display: block;
    text-align: left;
    padding-left: 50px;
  }

  ul {
    max-width: 500px;
    padding-left: 90px;
    text-align: left;
  }
</style>